const { Payroll } = require('../models');

const createPayroll = async (payload, context) => {
  return Payroll.create(payload, { context });
};

const findPayrollByPeriod = async (attendance_period_id) => {
  return Payroll.findOne({ where: { attendance_period_id } });
};

module.exports = {
  createPayroll,
  findPayrollByPeriod
};
