import { model, Schema } from 'mongoose';

const invoiceSchema = new Schema(
  {
    apartmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    readingsId: {
      type: Schema.Types.ObjectId,
      ref: 'Readings',
      required: true,
    },
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
      required: false,
    },
    monthYear: {
      type: String,
      required: true,
    },
    maintenance: {
      tariff: { type: Number, required: true },
      value: { type: Number, required: true },
      charged: { type: Number, required: true },
    },
    publicElectricity: {
      tariff: { type: Number, required: true },
      value: { type: Number, required: true },
      charged: { type: Number, required: true },
    },
    services: [
      {
        name: { type: String, required: true },
        tariff: { type: Number, required: true },
        prev: { type: Number, required: true },
        curr: { type: Number, required: true },
        charged: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },
    debt: { type: Number, default: 0 },
    toPay: { type: Number, required: true },
    pdfUrl: { type: String, default: null },
  },
  { timestamps: true },
);

export const InvoiceCollection = model('Invoice', invoiceSchema);
