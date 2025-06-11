const request = require('supertest');
const app = require('../../../src/app');
const { AttendancePeriod } = require('../../../src/models');
const { loginAs } = require('../../helpers/auth.helper');

describe('POST /api/admin/payrolls/run', () => {
  let token;
  let attendancePeriodId;
  let userId;

  beforeAll(async () => {
    let adminUser = await loginAs('admin', 'admin123', 'admin');
    userId = adminUser?.user?.id;
    token = adminUser?.accessToken;

    const period = await AttendancePeriod.create({
      start_date: '2025-06-01',
      end_date: '2025-06-30',
      created_by: userId,
    });

    attendancePeriodId = period.id;
  });

  it('should process payroll for attendance period', async () => {
    const res = await request(app)
      .post('/api/admin/payrolls/run')
      .set('Authorization', `Bearer ${token}`)
      .send({ attendance_period_id: attendancePeriodId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Payroll processed');
    expect(Array.isArray(res.body.data.summary)).toBe(true);
  });
});
