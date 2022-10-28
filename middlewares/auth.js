require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { messages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messages[401].auth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-password');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError(messages[401].token));
    } else next(err);
  }
console.log(payload)
  req.user = payload;

  next();
};
