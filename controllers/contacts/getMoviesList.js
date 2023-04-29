const { Movie } = require("../../models/movie");
const { createError } = require("../../helpers");

const getMoviesList = async (req, res, next) => {
  const { page = 1, limit = 10, favorite = false } = req.query;
  const { _id: owner } = req.user;

  const total = await Movie.countDocuments({ owner }); //рахуємо кількість фільмів певного користувача
  const maxPage = Math.ceil(total / limit);
  const resPage = page > maxPage ? maxPage : page;
  const query = favorite ? { favorite, owner } : { owner };

  if (page < 1 || limit < 1) {
    next(createError(400, "Invalid page or limit"));
  }

  const result = await Movie.find(query, "-createdAt -updatedAt")
    .populate("owner", "-password -createdAt -updatedAt")
    .limit(limit)
    .skip((resPage - 1) * limit);

  res.status(200).json({
    contacts: result,
    total,
    page: resPage,
    limit,
  });
};

module.exports = getMoviesList;
