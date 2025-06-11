const { success, error } = require('../helpers/response');
const overtimeService = require('../services/overtime.service');

exports.submit = async (req, res) => {
  try {
    const result = await overtimeService.submitOvertime(req.user.id, req.body, {
        request_id: req.requestId,
        ip_address: req.clientIp,
        user_id: req.user.id
    });
    return success(res, result, 'Overtime submitted');
  } catch (err) {
    return error(res, err.message, 400);
  }
};
