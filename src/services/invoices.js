// import { ReadingsCollection } from '../db/models/readings.js';
// import { ApartmentCollection } from '../db/models/apartment.js';
// import { UsersCollection } from '../db/models/user.js';
// import { generateInvoicePDF } from '../utils/generateInvoicePDF.js';
// import { InvoiceCollection } from '../db/models/invoice.js';

// export const createInvoiceService = async ({ apartmentId, userId, monthYear, manualHouseElectricity, manualDebt }) => {

//   const latestReading = await ReadingsCollection.findOne({ apartmentId }).sort({ createdAt: -1 });
//   if (!latestReading) throw new Error('No readings found for this month');

//   const apartment = await ApartmentCollection.findById(apartmentId);
//   if (!apartment) throw new Error('Apartment not found');

//   const tariffs = {
//     electricityPersonal: 4.32,
//     waterCold: 25.01,
//     waterHot: 8.48,
//     maintenance: 10.54,
//     electricityHouse: 4.32,
//   };

//   const services = [
//    {
//       name: 'Electricity (personal, kWh)',
//       tariff: tariffs.electricityPersonal,
//       value: latestReading.electricity,
//       charged: latestReading.electricity * tariffs.electricityPersonal,
//     },
//     {
//       name: 'Cold water (m³)',
//       tariff: tariffs.waterCold,
//       value: latestReading.waterCold,
//       charged: latestReading.waterCold * tariffs.waterCold,
//     },
//     {
//       name: 'Hot water (m³)',
//       tariff: tariffs.waterHot,
//       value: latestReading.waterHot,
//       charged: latestReading.waterHot * tariffs.waterHot,
//     },
//     {
//       name: 'House maintenance (m²)',
//       tariff: tariffs.maintenance,
//       value: apartment.squareMeters,
//       charged: tariffs.maintenance * apartment.squareMeters,
//     },
//     {
//       name: 'Electricity in public areas',
//       tariff: tariffs.electricityHouse,
//       value: manualHouseElectricity,
//       charged: manualHouseElectricity * tariffs.electricityHouse,
//     },
//   ];

//   const totalAmount = services.reduce((sum, s) => sum + s.charged, 0);
//   const debt = manualDebt ?? 0;
//   const toPay = totalAmount + debt;

//   const invoice = await InvoiceCollection.create({
//     apartmentId,
//     userId,
//     readingsId: latestReading._id,
//     monthYear,
//     services,
//     totalAmount,
//     debt,
//     toPay,
//   });

//   const pdfUrl = await generateInvoicePDF(invoice);
//   invoice.pdfUrl = pdfUrl;
//   await invoice.save();

//   return invoice;
// };

import { ReadingsCollection } from '../db/models/readings.js';
import { ApartmentCollection } from '../db/models/apartment.js';
import { InvoiceCollection } from '../db/models/invoice.js';
import { generateInvoicePDF } from '../utils/generateInvoicePDF.js';

export const createInvoiceService = async ({
  apartmentId,
  userId,
  monthYear,
  manualHouseElectricity = 0,
  manualDebt = 0,
}) => {
  const apartment = await ApartmentCollection.findById(apartmentId);
  if (!apartment) throw new Error('Apartment not found');

  const existingInvoice = await InvoiceCollection.findOne({
    apartmentId,
    monthYear,
  });
  if (existingInvoice)
    throw new Error(`Invoice for ${monthYear} already exists`);

  const previousInvoice = await InvoiceCollection.findOne({ apartmentId })
    .sort({ createdAt: -1 })
    .lean();

  const latestReading = await ReadingsCollection.findOne({ apartmentId }).sort({
    createdAt: -1,
  });
  if (!latestReading) throw new Error('No readings found for this apartment');

  const prev = previousInvoice
    ? {
        electricity:
          previousInvoice.services.find((s) =>
            s.name.includes('Electricity (personal, kWh)'),
          )?.curr || 0,
        waterCold:
          previousInvoice.services.find((s) => s.name.includes('Cold water'))
            ?.curr || 0,
        waterHot:
          previousInvoice.services.find((s) => s.name.includes('Hot water'))
            ?.curr || 0,
      }
    : { electricity: 0, waterCold: 0, waterHot: 0 };

  const curr = {
    electricity: latestReading.electricity,
    waterCold: latestReading.waterCold,
    waterHot: latestReading.waterHot,
  };

  const diff = {
    electricity: Math.max(0, curr.electricity - prev.electricity),
    waterCold: Math.max(0, curr.waterCold - prev.waterCold),
    waterHot: Math.max(0, curr.waterHot - prev.waterHot),
  };

  const tariffs = {
    electricityPersonal: 4.32,
    waterCold: 25.01,
    waterHot: 8.48,
    maintenance: 10.54,
    electricityHouse: 4.32,
  };

  const services = [
    {
      name: 'Electricity (personal, kWh)',
      tariff: tariffs.electricityPersonal,
      prev: prev.electricity,
      curr: curr.electricity,
      charged: diff.electricity * tariffs.electricityPersonal,
    },
    {
      name: 'Cold water (m³)',
      tariff: tariffs.waterCold,
      prev: prev.waterCold,
      curr: curr.waterCold,
      charged: diff.waterCold * tariffs.waterCold,
    },
    {
      name: 'Hot water (m³)',
      tariff: tariffs.waterHot,
      prev: prev.waterHot,
      curr: curr.waterHot,
      charged: diff.waterHot * tariffs.waterHot,
    },
  ];

  const maintenance = {
    tariff: tariffs.maintenance,
    value: apartment.squareMeters,
    charged: tariffs.maintenance * apartment.squareMeters,
  };

  const publicElectricity = {
    tariff: tariffs.electricityHouse,
    value: manualHouseElectricity,
    charged: manualHouseElectricity * tariffs.electricityHouse,
  };

  const totalAmount = (
    services.reduce((sum, s) => sum + s.charged, 0) +
    maintenance.charged +
    publicElectricity.charged
  ).toFixed(2);

  const toPay = totalAmount + manualDebt;

  const invoice = await InvoiceCollection.create({
    apartmentId,
    userId,
    readingsId: latestReading._id,
    invoiceId: previousInvoice?._id || null,
    monthYear,
    maintenance,
    publicElectricity,
    services,
    totalAmount,
    debt: manualDebt,
    toPay,
  });

  return invoice;
};

export const getInvoicesByApartment = async (apartmentId, limit = 3) => {
  const invoices = await InvoiceCollection.find({ apartmentId })
    .populate('userId', 'name email')
    .populate('readingsId')
    .sort({ createdAt: -1 })
    .limit(limit);
  return invoices;
};
