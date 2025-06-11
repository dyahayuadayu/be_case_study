const { Attendance } = require('../models');

const findByUserAndDate = async (user_id, date) => {
  return Attendance.findOne({ where: { user_id, date } });
};

const createAttendance = async (payload, context) => {
  return Attendance.create(payload, { context });
};

module.exports = {
  findByUserAndDate,
  createAttendance
};
