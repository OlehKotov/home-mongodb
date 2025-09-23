import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../services/users.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseUserSortParams } from '../utils/parseUserSortParams.js';
import { logoutUser } from '../services/auth.js';

export const getUsersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseUserSortParams(req.query);
  const users = await getAllUsers({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const deleteUserControllerAndLogout = async (req, res, next) => {
  const { userId } = req.params;

  const user = await deleteUser(userId);

  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  res.status(204).send();
};

export const deleteUserController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await deleteUser(userId);

  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(204).send();
};

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const result = await updateUser(userId, req.body);

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: result.user,
  });
};
