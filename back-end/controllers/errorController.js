const AppError = require('../utils/appError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}.`;
    err = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};