import fs from 'fs';
import PDFDocument from 'pdfkit';

export const generateInvoicePDF = async (invoice) => {
  const folder = './uploads/invoices';
  fs.mkdirSync(folder, { recursive: true });
  const pdfPath = `${folder}/${invoice._id}.pdf`;

  const doc = new PDFDocument({ margin: 30 });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fontSize(18).text(`Рахунок до сплати за ${invoice.monthYear}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Квартира: ${invoice.apartmentId}`);
  doc.text(`Власник: ${invoice.userId}`);
  doc.moveDown();

  doc.text('Послуги:', { underline: true });
  invoice.services.forEach((s) => {
    doc.text(`${s.name}: ${s.value} × ${s.tariff} грн = ${s.charged.toFixed(2)} грн`);
  });

  doc.moveDown();
  doc.text(`Загальна сума: ${invoice.totalAmount.toFixed(2)} грн`);
  doc.text(`Борг: ${invoice.debt.toFixed(2)} грн`);
  doc.text(`До сплати: ${invoice.toPay.toFixed(2)} грн`, { bold: true });

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => resolve(pdfPath));
  });
};
