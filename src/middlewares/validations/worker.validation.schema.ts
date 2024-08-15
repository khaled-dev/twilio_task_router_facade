import Joi from "joi";

export const createWorkerValidationSchema = Joi.object({
  attributes: Joi.object({
    selected_language: Joi.string().required(),
  }).required(),
  friendly_name: Joi.string().required().min(3).max(255),
});

export const changeWorkerActivityValidationSchema = Joi.object({
  activitySid: Joi.string().required().min(3).max(255),
});
