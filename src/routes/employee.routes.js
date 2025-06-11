const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleAccess = require('../middlewares/role');
const { validateBody } = require('../middlewares/validate');

const AttendanceController = require('../controllers/attendance.controller');
const OvertimeController = require('../controllers/overtime.controller');
const ReimbursementController = require('../controllers/reimbursement.controller');
const PayslipController = require('../controllers/payslip.controller');

const { createOvertimeSchema } = require('../validators/overtime.validator');
const { createReimbursementSchema } = require('../validators/reimbursement.validator');

router.post(
  '/attendances',
  auth,
  roleAccess('employee'),
  AttendanceController.submit
);

router.post(
  '/overtimes',
  auth,
  roleAccess('employee'),
  validateBody(createOvertimeSchema),
  OvertimeController.submit
);

router.post(
  '/reimbursements',
  auth,
  roleAccess('employee'),
  validateBody(createReimbursementSchema),
  ReimbursementController.submit
);

router.get(
  '/payslip/:attendance_period_id',
  auth,
  roleAccess('employee'),
  PayslipController.getPayslip
);

module.exports = router;
