const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { messages } = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  // const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie), { message: messages[200].createMovie })
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(messages[400].movie));
        } else next(err);
      },
    );
};

module.exports.findMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).populate('owner').then((movie) => {
    if (!movie) {
      throw new NotFoundError(messages[404].movie);
    }
    if (movie.owner._id.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(messages[403].movie);
    }
    Movie.deleteOne(movie)
      .then(() => {
        res.status(200).send({ message: messages[200].delete });
      })
      .catch((err) => { next(err); });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages[400].movie));
      } else next(err);
    });
};
