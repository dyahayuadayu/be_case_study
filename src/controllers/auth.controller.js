const authService = require('../services/auth.service');
const { success, error } = require('../helpers/response');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return success(res, result, 'Login successful');
  } catch (err) {
    return error(res, err.message);
  }
};
