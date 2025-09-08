import createHttpError from "http-errors";
import { ReadingsCollection } from "../db/models/readings.js";
import mongoose from "mongoose";


export const getAllReadings = async (userApartmentId) => {
  const apartmentObjectId = new mongoose.Types.ObjectId(userApartmentId);

  const readings = await ReadingsCollection.find({ apartmentId: apartmentObjectId });
  if (!readings || readings.length === 0) {
    throw createHttpError(404, 'No readings found for this apartment');
  }

  return readings;
};


export const updateReadings = async (apartmentId, month, newData) => {
  if (!apartmentId || !month) {
    throw createHttpError(400, "apartmentId and month are required");
  }

  const updated = await ReadingsCollection.findOneAndUpdate(
    { apartmentId, month },
    { $set: newData },
    { new: true, upsert: true }
  );

  return updated;
};


