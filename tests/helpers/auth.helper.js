// tests/helpers/auth.helper.js
const bcrypt = require('bcryptjs');
const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/models');

const seedUser = async (username, password, role) => {
  const existing = await User.findOne({ where: { username } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed, role });
  }
};

const loginAs = async (username, password, role = 'admin') => {
  await seedUser(username, password, role);

  const res = await request(app).post('/api/auth/login').send({ username, password });
  return res.body.data;
};

module.exports = { loginAs };
