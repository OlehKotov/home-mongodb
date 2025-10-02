import {
  loginUser,
  logoutUser,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { FIFTEEN_MINUTES } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';
import createHttpError from 'http-errors';

export const registerUserController = async (req, res, next) => {
  try {
    const { user, session } = await registerUser(req.body);

    const { password, __v, createdAt, updatedAt, ...safeUser } =
      user.toObject();

    res.cookie('sessionId', session._id.toString(), {
      httpOnly: true,
      secure: true, 
      sameSite: 'none',
      maxAge: FIFTEEN_MINUTES,
      path: '/',
    });

    res.status(201).json({
      status: 201,
      message: 'User registered successfully!',
      data: safeUser,
    });
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json({ message: error.message });
    }
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const { user, session } = await loginUser(req.body);

    const { password, __v, createdAt, updatedAt, ...safeUser } =
      user.toObject();

    res.cookie('sessionId', session._id.toString(), {
      httpOnly: true,
      secure: true, 
      sameSite: 'none',
      maxAge: FIFTEEN_MINUTES,
      path: '/',
    });

    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: safeUser,
    });
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json({ message: error.message });
    }
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export const loginWithGoogleController = async (req, res, next) => {
  try {
    const { user, session } = await loginOrSignupWithGoogle(req.body.code);

    const { password, __v, createdAt, updatedAt, ...safeUser } =
      user.toObject();

    res.cookie('sessionId', session._id.toString(), {
      httpOnly: true,
      secure: true, 
      sameSite: 'none',
      maxAge: FIFTEEN_MINUTES,
      path: '/',
    });

    res.json({
      status: 200,
      message: 'Successfully logged in via Google OAuth!',
      data: safeUser,
    });
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json({ message: error.message });
    }
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.sessionId;

    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: true, 
      sameSite: 'none',
      path: '/',
    });

    res.status(204).send();
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json({ message: error.message });
    }
    next(createHttpError(500, 'Internal Server Error'));
  }
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
