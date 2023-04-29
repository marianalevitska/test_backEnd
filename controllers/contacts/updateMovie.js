const { Movie } = require("../../models/movie");
const { createError } = require("../../helpers");

const updateMovie = async (req, res, next) => {
  const movies = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!movies) {
    next(createError(404, "Not found"));
  }
  res.status(200).json(movies);
};

module.exports = updateMovie;
