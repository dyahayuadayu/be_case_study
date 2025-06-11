const request = require('supertest');
const app = require('../../../src/app');
const { loginAs } = require('../../helpers/auth.helper');

describe('POST /api/employee/attendances', () => {
  let token;

  beforeAll(async () => {
    let employeeUser = await loginAs('employee', 'employee123', 'employee');
    token = employeeUser?.accessToken;
  });

  it('should create an attendance for logged in employee', async () => {
    const res = await request(app)
      .post('/api/employee/attendances')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Attendance submitted');
    expect(res.body.data).toHaveProperty('id');
  });
});
