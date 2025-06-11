const { Payroll, Attendance, Overtime, Reimbursement } = require('../models');
const { Op } = require('sequelize');

const findPayroll = async (user_id, attendance_period_id) => {
  return Payroll.findOne({ where: { user_id, attendance_period_id } });
};

const findAttendances = async (user_id, start_date, end_date) => {
  return Attendance.findAll({
    where: { user_id, date: { [Op.between]: [start_date, end_date] } }
  });
};

const findOvertimes = async (user_id, start_date, end_date) => {
  return Overtime.findAll({
    where: { user_id, date: { [Op.between]: [start_date, end_date] } }
  });
};

const findReimbursements = async (user_id, start_date, end_date) => {
  return Reimbursement.findAll({
    where: { user_id, date: { [Op.between]: [start_date, end_date] } }
  });
};

module.exports = {
  findPayroll,
  findAttendances,
  findOvertimes,
  findReimbursements
};
