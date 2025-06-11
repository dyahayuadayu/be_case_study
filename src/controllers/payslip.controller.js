const { success, error } = require('../helpers/response');
const payslipService = require('../services/payslip.service');

exports.getPayslip = async (req, res) => {
  try {
    const result = await payslipService.getPayslip(req.user.id, req.params.attendance_period_id);
    return success(res, result);
  } catch (err) {
    return error(res, err.message, 404);
  }
};
