import createHttpError from 'http-errors';
import { ReadingsCollection } from '../db/models/readings.js';
import mongoose from 'mongoose';

export const getAllReadings = async (userApartmentId, limit = 2) => {
  const apartmentObjectId = new mongoose.Types.ObjectId(userApartmentId);

  const readings = await ReadingsCollection.find({
    apartmentId: apartmentObjectId,
  })
    .sort({ createdAt: -1 })
    .limit(limit);
  if (!readings || readings.length === 0) {
    throw createHttpError(404, 'No readings found for this apartment');
  }

  return readings;
};

export const updateReadings = async (apartmentId, month, newData) => {
  if (!apartmentId || !month) {
    throw createHttpError(400, 'apartmentId and month are required');
  }

  let existing = await ReadingsCollection.findOne({ apartmentId, month });

  if (!existing) {
    const previous = await ReadingsCollection.findOne(
      { apartmentId },
      {},
      { sort: { month: -1 } },
    );
    existing = previous || {};
  }

  const updatedData = {
    ...existing.toObject?.(),
    ...newData,
    apartmentId,
    month,
  };
  delete updatedData._id;

  const updated = await ReadingsCollection.findOneAndUpdate(
    { apartmentId, month },
    { $set: updatedData },
    { new: true, upsert: true },
  );

  return updated;
};
