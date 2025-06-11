const { Overtime } = require('../models');

const findByUserAndDate = async (user_id, date) => {
  return Overtime.findOne({ where: { user_id, date } });
};

const createOvertime = async (payload, context) => {
  return Overtime.create(payload, { context });
};

module.exports = {
  findByUserAndDate,
  createOvertime
};
