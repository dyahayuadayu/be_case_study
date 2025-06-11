const attendancePeriodRepository = require('../repositories/attendance-period.repository');

exports.create = async ({ start_date, end_date, created_by }, context) => {
  return attendancePeriodRepository.create({ start_date, end_date, created_by }, context);
};

exports.getAll = async () => {
  return attendancePeriodRepository.getAll();
};
