const { Movie } = require("../../models/movie");

const removeMovie = async (req, res, next) => {
  const deleteMovie = await Movie.findByIdAndRemove(req.params.id);
  if (!deleteMovie) {
    next(createError(404, "Not found"));
  }
  res.status(200).json({ message: "movie deleted" });
};

module.exports = removeMovie;
