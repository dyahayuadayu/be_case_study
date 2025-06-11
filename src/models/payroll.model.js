const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payroll = sequelize.define('Payroll', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  attendance_period_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  base_salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  attendance_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  overtime_hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reimbursement_total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  take_home_pay: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER
}, {
  tableName: 'payrolls',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['attendance_period_id', 'user_id']
    }
  ]
});

Payroll.associate = (models) => {
  Payroll.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

Payroll.addHook('afterCreate', async (instance, options) => {
  const { request_id, ip_address, user_id } = options.context || {};

  await sequelize.models.AuditLog.create({
    model_name: 'Payroll',
    operation: 'CREATE',
    record_id: instance.id,
    changes: instance.toJSON(),
    request_id,
    user_id,
    ip_address
  });
});

Payroll.addHook('afterUpdate', async (instance, options) => {
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
    model_name: 'Payroll',
    operation: 'UPDATE',
    record_id: instance.id,
    changes,
    request_id,
    user_id,
    ip_address
  });
});

module.exports = Payroll;
