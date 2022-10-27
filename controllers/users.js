const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.email },
    {
    new: true,
    runValidators: true,
    upsert: true
})
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    } else next(err);
  });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) { next(new ConflictError('Пользователь с таким email уже существует')); } else next(err);
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-password', { expiresIn: '7d' });
      res.send({ token, message: 'Авторизация прошла успешно.' });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new UnauthorizedError('Неверный логин или пароль'));
      } else next(err);
    });
};



# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin