const request = require('supertest');
const app = require('../../../src/app');
const { loginAs } = require('../../helpers/auth.helper');
const { AttendancePeriod } = require('../../../src/models');

describe('GET /api/employee/payslip/:id', () => {

    let token;
    let attendancePeriodId;

    beforeAll(async () => {
        // 1. Login sebagai employee
        const employeeUser = await loginAs('employee1', 'password', 'employee');
        const adminUser = await loginAs('admin', 'admin123', 'admin');
        token = employeeUser?.accessToken;

        // 2. Buat attendance_period
        const period = await AttendancePeriod.create({
            start_date: '2025-06-01',
            end_date: '2025-06-30',
            created_by: adminUser?.user?.id,
        });

        attendancePeriodId = period.id;

        // 3. Post attendance
        await request(app)
            .post('/api/employee/attendances')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        // 4. Post overtime
        await request(app)
            .post('/api/employee/overtimes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                date: '2025-06-09',
                hours: 2,
            });

        // 5. Post reimbursement
        await request(app)
            .post('/api/employee/reimbursements')
            .set('Authorization', `Bearer ${token}`)
            .send({
                date: '2025-06-09',
                amount: 250000,
                description: 'Beli paket data',
            });

        // 6. Jalankan payroll
        await request(app)
            .post('/api/admin/payrolls/run')
            .set('Authorization', `Bearer ${adminUser?.accessToken}`)
            .send({
                attendance_period_id: attendancePeriodId,
            });
    });


    it('should return payslip for given attendance period', async () => {
        const res = await request(app)
            .get(`/api/employee/payslip/${attendancePeriodId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Success');

        const data = res.body.data;
        expect(data).toHaveProperty('attendance_period');

        expect(data).toHaveProperty('attendance_breakdown');
        expect(data.attendance_breakdown).toHaveProperty('total_days');
        expect(data.attendance_breakdown).toHaveProperty('daily_salary');
        expect(data.attendance_breakdown).toHaveProperty('attendance_amount');

        expect(data).toHaveProperty('overtime_breakdown');
        expect(data.overtime_breakdown).toHaveProperty('total_hours');
        expect(data.overtime_breakdown).toHaveProperty('per_hour_rate');
        expect(data.overtime_breakdown).toHaveProperty('overtime_amount');

        expect(Array.isArray(data.reimbursements)).toBe(true);
        expect(data).toHaveProperty('reimbursement_total');
        expect(data).toHaveProperty('take_home_pay');
    });

});
