import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
      return next(createHttpError(401, 'No session provided'));
    }

    const session = await SessionsCollection.findById(sessionId);

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    const isSessionExpired = new Date() > new Date(session.sessionValidUntil);

    if (isSessionExpired) {
      await SessionsCollection.deleteOne({ _id: sessionId });
      return next(createHttpError(401, 'Session expired'));
    }

    const user = await UsersCollection.findById(session.userId);

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(500, 'Authentication error'));
  }
};
