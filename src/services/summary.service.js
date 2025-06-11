const { AttendancePeriod } = require('../models');
const summaryRepo = require('../repositories/summary.repository');

const getSummary = async (attendance_period_id) => {
  const period = await AttendancePeriod.findByPk(attendance_period_id);
  if (!period) throw new Error('Attendance period not found');

  const payrolls = await summaryRepo.findSummaryByPeriod(attendance_period_id);

  const summary = payrolls.map(p => ({
    user_id: p.user_id,
    username: p.user?.username || 'employee',
    take_home_pay: p.take_home_pay
  }));

  const total_take_home_pay = summary.reduce((acc, cur) => acc + cur.take_home_pay, 0);

  return {
    summary,
    total_take_home_pay
  };
};

module.exports = { getSummary };
