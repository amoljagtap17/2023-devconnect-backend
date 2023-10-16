import * as Joi from 'joi';

export const databaseValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
});
