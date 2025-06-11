const { User, Attendance, Overtime, Reimbursement, AttendancePeriod } = require('../models');
const payrollRepo = require('../repositories/payroll.repository');
const { calculateTakeHomePay } = require('../utils/payroll');
const { Op } = require('sequelize');

const processPayroll = async (attendance_period_id, admin_id, context) => {
  const period = await AttendancePeriod.findByPk(attendance_period_id);
  if (!period) throw new Error('Attendance period not found');

  const existing = await payrollRepo.findPayrollByPeriod(attendance_period_id);
  if (existing) throw new Error('Payroll already processed');

  const employees = await User.findAll({ where: { role: 'employee' } });
  const result = [];

  for (const emp of employees) {
    const [attendances, overtimes, reimbursements] = await Promise.all([
      Attendance.findAll({ where: { user_id: emp.id, date: { [Op.between]: [period.start_date, period.end_date] } } }),
      Overtime.findAll({ where: { user_id: emp.id, date: { [Op.between]: [period.start_date, period.end_date] } } }),
      Reimbursement.findAll({ where: { user_id: emp.id, date: { [Op.between]: [period.start_date, period.end_date] } } })
    ]);

    const attendanceDays = attendances.length;
    const overtimeHours = overtimes.reduce((t, o) => t + o.hours, 0);
    const reimbursement = reimbursements.reduce((t, r) => t + r.amount, 0);
    const baseSalary = 5000000 + emp.id * 100;

    const take_home_pay = calculateTakeHomePay({
      baseSalary,
      attendanceDays,
      overtimeHours,
      reimbursement
    });

    const saved = await payrollRepo.createPayroll({
      attendance_period_id,
      user_id: emp.id,
      base_salary: baseSalary,
      attendance_days: attendanceDays,
      overtime_hours: overtimeHours,
      reimbursement_total: reimbursement,
      take_home_pay,
      created_by: admin_id
    }, context);

    result.push({
      user_id: saved.user_id,
      username: emp.username,
      take_home_pay: saved.take_home_pay
    });
  }

  return result;
};

module.exports = { processPayroll };
