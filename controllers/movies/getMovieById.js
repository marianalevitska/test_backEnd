const { Movie } = require("../../models/movie");
const { createError } = require("../../helpers");

const getMovieById = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    next(createError(404, "Not Found"));
  }
  res.status(200).json(movie);
};

module.exports = getMovieById;
