const { error } = require('../helpers/response');

const validateBody = (schema) => (req, res, next) => {
  const { error: validationError } = schema.validate(req.body);
  if (validationError) {
    return error(res, validationError.message, 422);
  }
  next();
};

module.exports = { validateBody };
