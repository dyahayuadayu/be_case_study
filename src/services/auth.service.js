const authRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (username, password) => {
  const user = await authRepository.findByUsername(username);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

  return { accessToken: token, user: payload };
};
