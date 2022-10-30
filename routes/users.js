const usersRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validationProfileUpdate } = require('../middlewares/validation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', validationProfileUpdate, updateUser);

module.exports = usersRouter;
