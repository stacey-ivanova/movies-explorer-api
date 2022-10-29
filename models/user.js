const mongoose = require('mongoose');
const val = require('validator');
const bcrypt = require('bcryptjs');
const { messages } = require('../utils/constants');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return val.isEmail(v);
      },
      message: messages[401].email,
    },

  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages[401].user);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages[401].user);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
