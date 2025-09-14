import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
});

export const completeProfileSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'he name must be no more than 30 characters.',
  }),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone must be in format +380XXXXXXXXX',
      'string.empty': 'Phone is required',
    }),
  apartmentNumber: Joi.number().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
