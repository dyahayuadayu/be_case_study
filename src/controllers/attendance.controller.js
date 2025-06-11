const { success, error } = require('../helpers/response');
const attendanceService = require('../services/attendance.service');

exports.submit = async (req, res) => {
  try {
    const result = await attendanceService.submitAttendance(req.user.id, {
        request_id: req.requestId,
        ip_address: req.clientIp,
        user_id: req.user.id
    });
    return success(res, result, 'Attendance submitted');
  } catch (err) {
    return error(res, err.message, 400);
  }
};