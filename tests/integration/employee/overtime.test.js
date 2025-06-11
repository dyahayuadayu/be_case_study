const request = require('supertest');
const app = require('../../../src/app');
const { loginAs } = require('../../helpers/auth.helper');

describe('POST /api/employee/overtimes', () => {
  let token;

  beforeAll(async () => {
    let employeeUser = await loginAs('employee', 'employee123', 'employee');
    token = employeeUser?.accessToken;
  });

  it('should create an overtime record for employee', async () => {
    const res = await request(app)
      .post('/api/employee/overtimes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2025-06-09',
        hours: 2
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Overtime submitted');
    expect(res.body.data).toHaveProperty('id');
  });

  it('should fail when employee create more than 3 hours overtime a day', async () => {
    const res = await request(app)
      .post('/api/employee/overtimes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2025-06-15',
        hours: 5
      });

    expect(res.statusCode).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('\"hours\" must be less than or equal to 3');
  });

  it('should fail when employee create multiple overtimes a day', async () => {
    const res = await request(app)
      .post('/api/employee/overtimes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2025-06-09',
        hours: 2
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Overtime already submitted for this date');
  });

  it('should fail when employee create multiple overtimes a day', async () => {
    const res = await request(app)
      .post('/api/employee/overtimes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2026-06-09',
        hours: 2
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Cannot submit overtime for future date');
  });
});
