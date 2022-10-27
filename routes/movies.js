const moviesRouter = require('express').Router();
const { findMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/movies', findMovies);
moviesRouter.post('/movies', createMovie);
moviesRouter.delete('/movies/:_id', deleteMovie);

module.exports = moviesRouter;
