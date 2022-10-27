const router = require('express').Router();
const usersRouter = require('../routes/users');
const moviesRouter = require('../routes/movies');

router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;