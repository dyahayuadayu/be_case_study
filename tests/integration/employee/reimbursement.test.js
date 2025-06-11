const request = require('supertest');
const app = require('../../../src/app');
const { loginAs } = require('../../helpers/auth.helper');

describe('POST /api/employee/reimbursements', () => {
  let token;

  beforeAll(async () => {
    let employeeUser = await loginAs('employee', 'employee123', 'employee');
    token = employeeUser?.accessToken;
  });

  it('should create a reimbursement record for employee', async () => {
    const res = await request(app)
      .post('/api/employee/reimbursements')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2025-06-09',
        amount: 250000,
        description: 'Beli paket data'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Reimbursement submitted');
    expect(res.body.data).toHaveProperty('id');
  });
});
