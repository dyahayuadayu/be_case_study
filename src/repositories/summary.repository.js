const { Payroll, User } = require('../models');

const findSummaryByPeriod = async (attendance_period_id) => {
  return Payroll.findAll({
    where: { attendance_period_id },
    // include: [
    //   {
    //     model: User,
    //     attributes: ['id', 'username'],
    //     as: 'user'
    //   }
    // ]
  });
};

module.exports = { findSummaryByPeriod };
