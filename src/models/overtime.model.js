const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Overtime = sequelize.define('Overtime', {
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
  hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3
    }
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER
}, {
  tableName: 'overtimes',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'date']
    }
  ]
});

Overtime.addHook('afterCreate', async (instance, options) => {
  const { request_id, ip_address, user_id } = options.context || {};

  await sequelize.models.AuditLog.create({
    model_name: 'Overtime',
    operation: 'CREATE',
    record_id: instance.id,
    changes: instance.toJSON(),
    request_id,
    user_id,
    ip_address
  });
});

Overtime.addHook('afterUpdate', async (instance, options) => {
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
    model_name: 'Overtime',
    operation: 'UPDATE',
    record_id: instance.id,
    changes,
    request_id,
    user_id,
    ip_address
  });
});

module.exports = Overtime;
