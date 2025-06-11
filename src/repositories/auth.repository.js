const { User } = require('../models');

exports.findByUsername = (username) => {
  return User.findOne({ where: { username } });
};
