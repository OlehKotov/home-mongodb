
import createHttpError from 'http-errors';

export const checkRoles = (...roles) => (req, res, next) => {
  const { user } = req;

  if (!user) {
    return next(createHttpError(401, 'User not authenticated'));
  }

  if (roles.includes(user.role)) {
    return next();
  }

  return next(createHttpError(403, 'Access denied'));
};