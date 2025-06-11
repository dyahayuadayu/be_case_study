function calculateTakeHomePay({ baseSalary, attendanceDays, overtimeHours, reimbursement }) {
  const salaryPerDay = baseSalary / 20;
  const attendancePay = salaryPerDay * attendanceDays;
  const overtimePay = (salaryPerDay / 8) * 2 * overtimeHours;
  return Math.round(attendancePay + overtimePay + reimbursement);
}
module.exports = { calculateTakeHomePay };
