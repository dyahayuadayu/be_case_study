const request = require('supertest');
const app = require('../../../src/app');
const bcrypt = require('bcryptjs');
const { User } = require('../../../src/models');

const seedUser = async () => {
  const existing = await User.findOne({ where: { username: 'admin' } });
  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({ username: 'admin', password: hashed, role: 'admin' });
  }
};

describe('POST /api/auth/login', () => {
  beforeAll(async () => {
    await seedUser();
  });

  it('should return accessToken when credentials are valid', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('accessToken');
  });

  it('should fail when credentials are invalid', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'wrongpass' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
