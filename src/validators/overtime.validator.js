const Joi = require('joi');

const createOvertimeSchema = Joi.object({
  date: Joi.date().required(),
  hours: Joi.number().min(1).max(3).required()
});

module.exports = { createOvertimeSchema };
