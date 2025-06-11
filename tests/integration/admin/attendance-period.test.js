const request = require('supertest');
const app = require('../../../src/app');
const { loginAs } = require('../../helpers/auth.helper');

describe('POST /api/admin/attendance-periods', () => {
  let token;

  beforeAll(async () => {
    let adminUser = await loginAs('admin', 'admin123', 'admin');
    token = adminUser?.accessToken;
  });

  it('should create a new attendance period', async () => {
    const res = await request(app)
      .post('/api/admin/attendance-periods')
      .set('Authorization', `Bearer ${token}`)
      .send({
        start_date: '2025-01-01',
        end_date: '2025-01-30'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Attendance period created');
    expect(res.body.data).toHaveProperty('id');
  });
});
