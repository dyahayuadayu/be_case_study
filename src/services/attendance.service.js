const attendanceRepo = require('../repositories/attendance.repository');
const { isWeekend } = require('../utils/date');

const submitAttendance = async (user_id, context) => {
  const today = new Date().toISOString().slice(0, 10);

  if (isWeekend(today)) {
    throw new Error('Cannot submit attendance on weekend');
  }

  const exists = await attendanceRepo.findByUserAndDate(user_id, today);
  if (exists) {
    throw new Error('Already submitted attendance today');
  }

  return attendanceRepo.createAttendance({
    user_id,
    date: today,
    created_by: user_id
  }, context);
};

module.exports = { submitAttendance };
