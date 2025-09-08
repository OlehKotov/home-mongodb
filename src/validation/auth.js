import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Імʼя не може бути порожнім',
    'string.min': 'Імʼя має містити мінімум 3 символи',
    'string.max': 'Імʼя має містити максимум 30 символів',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Некоректний email',
    'string.empty': 'Email обовʼязковий',
  }),

  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Телефон має бути у форматі +380XXXXXXXXX',
      'string.empty': 'Телефон обовʼязковий',
    }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль має бути мінімум 6 символів',
    'string.empty': 'Пароль обовʼязковий',
  }),

  role: Joi.string().valid('owner', 'admin').messages({
    'any.only': 'Роль має бути owner або admin ',
  }),

  apartmentId: Joi.string().allow(null).messages({
    'string.base': 'apartmentId має бути рядком або null',
  }),
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
