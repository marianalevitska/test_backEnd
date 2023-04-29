const { Movie } = require("../../models/movie");
const { createError } = require("../../helpers");

const updateStatusMovie = async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!movie) {
    next(createError(404, "Not Found"));
  }
  res.status(200).json(movie);
};

module.exports = updateStatusMovie;
