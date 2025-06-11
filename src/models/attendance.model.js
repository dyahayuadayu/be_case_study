const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER
}, {
  tableName: 'attendances',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'date']
    }
  ]
});

Attendance.addHook('afterCreate', async (instance, options) => {
  const { request_id, ip_address, user_id } = options.context || {};

  await sequelize.models.AuditLog.create({
    model_name: 'Attendance',
    operation: 'CREATE',
    record_id: instance.id,
    changes: instance.toJSON(),
    request_id,
    user_id,
    ip_address
  });
});

Attendance.addHook('afterUpdate', async (instance, options) => {
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
    model_name: 'Attendance',
    operation: 'UPDATE',
    record_id: instance.id,
    changes,
    request_id,
    user_id,
    ip_address
  });
});


module.exports = Attendance;
