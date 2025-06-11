const jwt = require('jsonwebtoken');
const { error } = require('../helpers/response');

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return error(res, 'Token not provided', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token', 401);
  }
};

module.exports = auth;
