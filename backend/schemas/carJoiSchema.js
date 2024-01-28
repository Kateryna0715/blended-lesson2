const Joi = require("joi");

const carJoiSchema = Joi.object({
  title: Joi.string().required(),

  model: Joi.string(),

  price: Joi.number().required(),

  color: Joi.string(),
});

module.exports = carJoiSchema;
