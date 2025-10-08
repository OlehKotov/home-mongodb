import createHttpError from "http-errors";
import { getAllReadings, updateReadings } from "../services/readings.js";



export const getReadingsController = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 2;
    const readings = await getAllReadings(req.user.apartmentId, limit);

    res.json({
      status: 200,
      message: 'Successfully found readings!',
      data: readings,
    });
  } catch (err) {
    next(err);
  }
};

export const updateReadingsController = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const { month, ...newData } = req.body;

    const result = await updateReadings(apartmentId, month, newData);

    if (!result) {
      return next(createHttpError(404, "Apartment or month not found"));
    }

    res.json({
      status: 200,
      message: "Successfully updated readings!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};