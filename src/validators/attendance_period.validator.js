const Joi = require('joi');

const createAttendancePeriodSchema = Joi.object({
  start_date: Joi.date().required(),
  end_date: Joi.date().greater(Joi.ref('start_date')).required()
});

module.exports = { createAttendancePeriodSchema };
