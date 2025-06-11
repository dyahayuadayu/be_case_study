const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RequestLog = sequelize.define('RequestLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  request_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.JSON,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'request_logs',
  underscored: true,
  timestamps: false // karena kita hanya pakai created_at manual
});

RequestLog.associate = (models) => {
  RequestLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = RequestLog;
