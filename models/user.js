const mongoose = require('mongoose');
const val = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
        validator(v) {
        return val.isEmail(v);
      },
      message: 'Некорректный Email',
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

module.exports = mongoose.model('user', userSchema);
