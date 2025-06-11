const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleAccess = require('../middlewares/role');
const { validateBody } = require('../middlewares/validate');

const AttendancePeriodController = require('../controllers/attendance-period.controller');
const PayrollController = require('../controllers/payroll.controller');

const { createAttendancePeriodSchema } = require('../validators/attendance_period.validator');
const { payrollRunSchema } = require('../validators/payroll_run.validator');

router.post(
  '/attendance-periods',
  auth,
  roleAccess('admin'),
  validateBody(createAttendancePeriodSchema),
  AttendancePeriodController.create
);

router.post(
  '/payrolls/run',
  auth,
  roleAccess('admin'),
  validateBody(payrollRunSchema),
  PayrollController.run
);

router.get(
  '/payrolls/summary/:attendance_period_id',
  auth,
  roleAccess('admin'),
  PayrollController.getSummary
);


module.exports = router;
