const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validationLogin, validationCreateUser } = require('../middlewares/validation');
const { createUser, loginUser } = require('../controllers/users');
const { messages } = require('../utils/constants');
const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, loginUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(messages[404].page));
});

module.exports = router;
