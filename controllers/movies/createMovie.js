const { Movie } = require("../../models/movie");

const createMovie = async (req, res, next) => {
  const { _id: owner } = req.user;
  const movie = await Movie.create({
    ...req.body,
    owner,
  });
  res.status(201).json(movie);
};

module.exports = createMovie;
