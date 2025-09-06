import { ApartmentCollection } from '../db/models/apartment.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllApartments = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const apartmentsQuery = ApartmentCollection.find();

 if (filter.apartmentNumber !== undefined && filter.apartmentNumber !== null) {
  apartmentsQuery.where('apartmentNumber').equals(filter.apartmentNumber);
}
if (filter.floor !== undefined && filter.floor !== null) {
  apartmentsQuery.where('floor').equals(filter.floor);
}
if (filter.squareMeters !== undefined && filter.squareMeters !== null) {
  apartmentsQuery.where('squareMeters').equals(filter.squareMeters);
}
if (filter.status) {
  apartmentsQuery.where('status').equals(filter.status);
}

  const [apartmentsCount, apartments] = await Promise.all([
    ApartmentCollection.find().merge(apartmentsQuery).countDocuments(),
    apartmentsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(
    apartmentsCount,
    perPage,
    page,
  );

  return {
    data: apartments,
    ...paginationData,
  };
};

export const getApartmentById = async (apartmentId) => {
  const apartment = await ApartmentCollection.findById(apartmentId);
  return apartment;
};
