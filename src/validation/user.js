import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Імʼя не може бути порожнім',
      'string.min': 'Імʼя має містити мінімум 3 символи',
      'string.max': 'Імʼя має містити максимум 30 символів',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
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

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Пароль має бути мінімум 6 символів',
      'string.empty': 'Пароль обовʼязковий',
    }),

  role: Joi.string()
    .valid('owner', 'admin')
    .required()
    .messages({
      'any.only': 'Роль має бути owner або admin ',
      'string.empty': 'Роль обовʼязкова',
    }),

  apartmentId: Joi.string()
    .allow(null) 
    .messages({
      'string.base': 'apartmentId має бути рядком або null',
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .messages({
      'string.min': 'Імʼя має містити мінімум 3 символи',
      'string.max': 'Імʼя має містити максимум 30 символів',
    }),

  email: Joi.string()
    .email()
    .messages({
      'string.email': 'Некоректний email',
    }),

  phone: Joi.string()
    .pattern(/^\+380\d{9}$/) 
    .messages({
      'string.pattern.base': 'Телефон має бути у форматі +380XXXXXXXXX',
    }),

  password: Joi.string()
    .min(6)
    .messages({
      'string.min': 'Пароль має бути мінімум 6 символів',
    }),

  role: Joi.string()
    .valid('owner', 'admin')
    .messages({
      'any.only': 'Роль має бути owner або admin ',
    }),

  apartmentId: Joi.string()
    .allow(null) 
    .messages({
      'string.base': 'apartmentId має бути рядком або null',
    }),
}).min(1);