const Joi = require('joi');

const payrollRunSchema = Joi.object({
  attendance_period_id: Joi.number().required()
});

module.exports = { payrollRunSchema };
