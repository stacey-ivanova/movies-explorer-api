const usersRouter = require('express').Router();
const { getUser, updateUser, createUser, loginUser } = require('../controllers/users')

usersRouter.get('/users/me', getUser)
usersRouter.patch('/users/me', updateUser)
usersRouter.post('/signup', createUser)
usersRouter.post('/signin', loginUser)

module.exports = usersRouter;

