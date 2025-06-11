const Joi = require('joi');

const createReimbursementSchema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().min(1).required(),
  description: Joi.string().allow('').max(255)
});

module.exports = { createReimbursementSchema };
