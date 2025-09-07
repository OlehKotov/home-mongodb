import Joi from 'joi';

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