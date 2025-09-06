

const parseStatus = (status) => {
  const isString = typeof status === 'string';
  if (!isString) return;
  const isGender = (status) => ['free', 'occupied'].includes(status);

  if (isGender(status)) return status;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parsedNumber;
};

export const parseApartmentFilterParams = (query) => {
  const { apartmentNumber, floor, squareMeters, status } = query;

  const parsedApartmentNumber = parseNumber(apartmentNumber);
  const parsedFloor = parseNumber(floor);
  const parsedSquareMeters = parseNumber(squareMeters);
  const parsedStatus = parseStatus(status);

  return {
    apartmentNumber: parsedApartmentNumber,
    floor: parsedFloor,
    squareMeters: parsedSquareMeters,
    status: parsedStatus,
  };
};
