import {
  completeProfile,
  loginUser,
  logoutUser,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';
import { SessionsCollection } from '../db/models/session.js';

export const registerUserController = async (req, res) => {
  const { user, accessToken } = await registerUser(req.body);

  const session = await SessionsCollection.findOne({ userId: user._id });

  const { password, ...safeUser } = user.toObject();

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });

  res.status(201).json({
    status: 201,
    message: 'Draft user created!',
    data: {
      ...safeUser,
      accessToken: session.accessToken,
    },
  });
};

export const completeProfileController = async (req, res) => {
  const user = await completeProfile(req.user._id, req.body);

  const { password, ...safeUser } = user.toObject();

  res.status(200).json({
    status: 200,
    message: 'Profile completed!',
    data: safeUser,
  });
};

export const loginUserController = async (req, res) => {
  const { user, accessToken } = await loginUser(req.body);

  const { password, __v, createdAt, updatedAt, ...safeUser } = user.toObject();

  const session = await SessionsCollection.findOne({ userId: user._id });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      ...safeUser,
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { session, user } = await loginOrSignupWithGoogle(req.body.code);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  const { password, __v, createdAt, updatedAt, ...safeUser } = user.toObject();

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      ...safeUser,
      accessToken: session.accessToken,
    },
  });
};
