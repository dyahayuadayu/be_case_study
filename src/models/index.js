const sequelize = require('../config/database');
const User = require('./user.model');
const AttendancePeriod = require('./attendance_period.model');
const Attendance = require('./attendance.model');
const Overtime = require('./overtime.model');
const Reimbursement = require('./reimbursement.model');
const Payroll = require('./payroll.model');
const RequestLog = require('./request_log.model');
const AuditLog = require('./audit_log.model');

const db = {
  sequelize,
  User,
  AttendancePeriod,
  Attendance,
  Overtime,
  Reimbursement,
  Payroll,
  RequestLog,
  AuditLog,
};

let initialized = false;

const initModels = async () => {
  if (initialized) return;
  initialized = true;

  Object.values(db).forEach(model => {
    if (model.associate) model.associate(db);
  });

  const isTest = process.env.NODE_ENV === 'test';
  await sequelize.sync({ [isTest ? 'force' : 'alter']: true });
};

module.exports = { ...db, initModels };