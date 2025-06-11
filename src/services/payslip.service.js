const { AttendancePeriod } = require('../models');
const payslipRepo = require('../repositories/payslip.repository');

const getPayslip = async (user_id, attendance_period_id) => {
  const period = await AttendancePeriod.findByPk(attendance_period_id);
  if (!period) throw new Error('Attendance period not found');

  const payroll = await payslipRepo.findPayroll(user_id, attendance_period_id);
  if (!payroll) throw new Error('Payslip not found. Payroll may not be processed yet.');

  const [attendances, overtimes, reimbursements] = await Promise.all([
    payslipRepo.findAttendances(user_id, period.start_date, period.end_date),
    payslipRepo.findOvertimes(user_id, period.start_date, period.end_date),
    payslipRepo.findReimbursements(user_id, period.start_date, period.end_date)
  ]);

  const dailySalary = payroll.base_salary / 20;
  const perHourRate = (dailySalary / 8) * 2;
  const overtimeAmount = perHourRate * payroll.overtime_hours;
  const attendanceAmount = dailySalary * payroll.attendance_days;

  return {
    attendance_period: {
      id: period.id,
      start_date: period.start_date,
      end_date: period.end_date
    },
    attendance_breakdown: {
      total_days: payroll.attendance_days,
      daily_salary: dailySalary,
      attendance_amount: attendanceAmount
    },
    overtime_breakdown: {
      total_hours: payroll.overtime_hours,
      per_hour_rate: perHourRate,
      overtime_amount: overtimeAmount
    },
    reimbursements: reimbursements.map(r => ({
      date: r.date,
      amount: r.amount,
      description: r.description
    })),
    reimbursement_total: payroll.reimbursement_total,
    take_home_pay: payroll.take_home_pay
  };
};

module.exports = { getPayslip };
