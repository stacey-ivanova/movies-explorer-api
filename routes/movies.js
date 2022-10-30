const moviesRouter = require('express').Router();
const { findMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationMovie, validationMovieId } = require('../middlewares/validation');

moviesRouter.get('/', findMovies);
moviesRouter.post('/', validationMovie, createMovie);
moviesRouter.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = moviesRouter;
