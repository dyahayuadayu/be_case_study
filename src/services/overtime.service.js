const overtimeRepo = require('../repositories/overtime.repository');

const submitOvertime = async (user_id, { date, hours }, context) => {
  const today = new Date().toISOString().slice(0, 10);

  if (new Date(date) > new Date(today)) {
    throw new Error('Cannot submit overtime for future date');
  }

  if (hours > 3) {
    throw new Error('Overtime cannot be more than 3 hours');
  }

  const exists = await overtimeRepo.findByUserAndDate(user_id, date);
  if (exists) {
    throw new Error('Overtime already submitted for this date');
  }

  return overtimeRepo.createOvertime({
    user_id,
    date,
    hours,
    created_by: user_id
  }, context);
};

module.exports = { submitOvertime };
