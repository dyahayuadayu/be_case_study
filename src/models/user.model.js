const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'employee'),
    allowNull: false
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true
});

User.addHook('afterCreate', async (instance, options) => {
  const { request_id, ip_address, user_id } = options.context || {};

  await sequelize.models.AuditLog.create({
    model_name: 'User',
    operation: 'CREATE',
    record_id: instance.id,
    changes: instance.toJSON(),
    request_id,
    user_id,
    ip_address
  });
});

User.addHook('afterUpdate', async (instance, options) => {
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
    model_name: 'User',
    operation: 'UPDATE',
    record_id: instance.id,
    changes,
    request_id,
    user_id,
    ip_address
  });
});

module.exports = User;
