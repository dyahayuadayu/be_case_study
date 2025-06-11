const { success, error } = require('../helpers/response');
const reimbursementService = require('../services/reimbursement.service');

exports.submit = async (req, res) => {
  try {
    const result = await reimbursementService.submitReimbursement(req.user.id, req.body, {
        request_id: req.requestId,
        ip_address: req.clientIp,
        user_id: req.user.id
    });
    return success(res, result, 'Reimbursement submitted');
  } catch (err) {
    return error(res, err.message, 400);
  }
};
