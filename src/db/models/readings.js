import { model, Schema } from 'mongoose';

const readingsSchema = new Schema(
  {
    apartmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    electricity: {
      type: Number,
      required: false,
    },
     waterCold: {
      type: Number,
      required: false,
    },
    waterHot: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

export const ReadingsCollection = model('Readings', readingsSchema);
