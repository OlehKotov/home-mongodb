import { getAllApartments, getApartmentById } from '../services/apartments.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseApartmentSortParams } from '../utils/parseApartmentSortParams.js';
import { parseApartmentFilterParams } from '../utils/parseApartmentFilterParams.js';

export const getApartmentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseApartmentSortParams(req.query);
  const filter = parseApartmentFilterParams(req.query);

  const apartments = await getAllApartments({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found apartments!',
    data: apartments,
  });
};

export const getApartmentByIdController = async (req, res, next) => {
  const { apartmentId } = req.params;
  const apartment = await getApartmentById(apartmentId);

  if (!apartment) {
    throw createHttpError(404, 'Apartment not found');
  }

  res.json({
    status: 200,
    message: `Successfully found apartment with id ${apartmentId}!`,
    data: apartment,
  });
};
