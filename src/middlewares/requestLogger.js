const { RequestLog } = require('../models');
const { v4: uuidv4 } = require('uuid');

const requestLogger = async (req, res, next) => {
  const requestId = uuidv4(); // Generate unique request ID
  req.request_id = requestId;

  res.on('finish', async () => {
    try {
      const safeBody = (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0)
        ? JSON.stringify(req.body)
        : null;

      await RequestLog.create({
        request_id: requestId,
        user_id: req.user?.id || null,
        ip_address: req.ip,
        method: req.method,
        endpoint: req.originalUrl,
        body: safeBody,
        created_at: new Date()
      });
    } catch (error) {
      console.error('Failed to log request:', error.message);
    }
  });

  next();
};

module.exports = requestLogger;
