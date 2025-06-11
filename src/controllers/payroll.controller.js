const payrollService = require('../services/payroll.service');
const summaryService = require('../services/summary.service');
const { success, error } = require('../helpers/response');

exports.run = async (req, res) => {
  try {
    const { attendance_period_id } = req.body;
    const result = await payrollService.processPayroll(attendance_period_id, req.user.id, {
        request_id: req.requestId,
        ip_address: req.clientIp,
        user_id: req.user.id
    });
    return success(res, { summary: result }, 'Payroll processed');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getSummary = async (req, res) => {
  try {
    const result = await summaryService.getSummary(req.params.attendance_period_id);
    return success(res, result);
  } catch (err) {
    return error(res, err.message, 404);
  }
};

