const request = require('supertest');
const app = require('../../../src/app');
const { loginAs } = require('../../helpers/auth.helper');
const { AttendancePeriod } = require('../../../src/models');

describe('GET /api/admin/payrolls/summary/:id', () => {

    let token;
    let attendancePeriodId;

    beforeAll(async () => {
        // 1. Login sebagai admin
        const adminUser = await loginAs('admin', 'admin123', 'admin');
        token = adminUser?.accessToken;

        // 2. Buat attendance_period
        const period = await AttendancePeriod.create({
            start_date: '2025-07-01',
            end_date: '2025-07-30',
            created_by: adminUser?.user?.id,
        });

        attendancePeriodId = period.id;

        // 2. Jalankan payroll
        await request(app)
            .post('/api/admin/payrolls/run')
            .set('Authorization', `Bearer ${token}`)
            .send({
                attendance_period_id: attendancePeriodId,
            });
    });

    it('should return payrolls summary for given attendance period', async () => {
        const res = await request(app)
            .get(`/api/admin/payrolls/summary/${attendancePeriodId}`)
            .set('Authorization', `Bearer ${token}`);

            console.log('🔍 Summary response:', res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Success');
        expect(res.body.data).toHaveProperty('summary');
        expect(Array.isArray(res.body.data.summary)).toBe(true);
        expect(res.body.data).toHaveProperty('total_take_home_pay');
    });

});
