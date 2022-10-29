const { messages } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? messages[500].default
      : message,
  });
  next();
};
