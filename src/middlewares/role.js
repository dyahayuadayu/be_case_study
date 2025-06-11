const { error } = require('../helpers/response');

const roleAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 'Forbidden: insufficient role', 403);
    }
    next();
  };
};

module.exports = roleAccess;
