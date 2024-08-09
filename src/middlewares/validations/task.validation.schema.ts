import Joi from "joi";

export const createTaskValidationSchema = Joi.object({
  attributes: Joi.object({
    selected_language: Joi.string().required(),
  }).required(),
});
