const getMoviesList = require("./getMoviesList");
const getMovieById = require("./getMovieById");
const createMovie = require("./createMovie");
const removeMovie = require("./removeMovie");
const updateMovie = require("./updateMovie");
const updateStatusMovie = require("./updateStatusMovie");

module.exports = {
  getMoviesList,
  getMovieById,
  createMovie,
  removeMovie,
  updateMovie,
  updateStatusMovie,
};
