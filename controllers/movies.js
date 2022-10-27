const Movie = require('../models/movie');

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: userId })
    .then((movie) => res.status(200).send(movie))
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные при создании фильма'));
        } else next(err);
      },
    );
};

module.exports.findMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).then((movie) => {
    if (!movie) {
      throw new NotFoundError('Фильм с указанным id не найден');
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Можно удалять только свои фильмы');
    }
    Movie.deleteOne(movie)
      .then(() => {
        res.status(200).send({ message: 'Фильм успешно удален' });
      })
      .catch((err) => { next(err); });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные фильма.'));
      } else next(err);
    });
};


# возвращает все сохранённые текущим  пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id