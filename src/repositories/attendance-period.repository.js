const { AttendancePeriod } = require('../models');

exports.create = ({ start_date, end_date, created_by }, context) => {
  return AttendancePeriod.create({ start_date, end_date, created_by }, { context });
};

exports.getAll = () => {
  return AttendancePeriod.findAll({ order: [['start_date', 'ASC']] });
};
