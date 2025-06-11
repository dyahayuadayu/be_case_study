const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AttendancePeriod = sequelize.define('AttendancePeriod', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER
}, {
  tableName: 'attendance_periods',
  underscored: true,
  timestamps: true
});

AttendancePeriod.addHook('afterCreate', async (instance, options) => {
  const { request_id, ip_address, user_id } = options.context || {};

  await sequelize.models.AuditLog.create({
    model_name: 'AttendancePeriod',
    operation: 'CREATE',
    record_id: instance.id,
    changes: instance.toJSON(),
    request_id,
    user_id,
    ip_address
  });
});

AttendancePeriod.addHook('afterUpdate', async (instance, options) => {
  const { request_id, ip_address, user_id } = options.context || {};
  const changedFields = instance.changed();

  const changes = {};
  changedFields.forEach(field => {
    changes[field] = {
      from: instance._previousDataValues[field],
      to: instance.dataValues[field]
    };
  });

  await sequelize.models.AuditLog.create({
    model_name: 'AttendancePeriod',
    operation: 'UPDATE',
    record_id: instance.id,
    changes,
    request_id,
    user_id,
    ip_address
  });
});

module.exports = AttendancePeriod;
