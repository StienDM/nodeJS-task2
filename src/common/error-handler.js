const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { logger } = require('./logger');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    logger.error(JSON.stringify({ status, message: getStatusText(status) }));
    await res.status(status).json({ message: getStatusText(status) });
  }
  next();
};

const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = { errorHandler, catchErrors };
