const attendancePeriodService = require('../services/attendance-period.service');
const { success, error } = require('../helpers/response');

exports.create = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const created_by = req.user.id;
    const result = await attendancePeriodService.create({ start_date, end_date, created_by }, {
        request_id: req.requestId,
        ip_address: req.clientIp,
        user_id: req.user.id
    });
    return success(res, result, 'Attendance period created');
  } catch (err) {
    return error(res, err.message);
  }
};
