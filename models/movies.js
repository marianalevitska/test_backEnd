const fs = require("fs/promises");
const path = require("path");
const objectId = require("bson-objectid");

const moviesPath = path.join(__dirname, "movies.json");

const updateData = async (data) => {
  return fs.writeFile(moviesPath, JSON.stringify(data));
};

const listMovies = async () => {
  const movies = await fs.readFile(moviesPath);
  return JSON.parse(movies);
};

const getMovieById = async (movieId) => {
  const movies = await listMovies();
  const res = movies.find(
    (movie) => JSON.stringify(movieId) === JSON.stringify(movie.id)
  );
  return res;
};

const removeMovie = async (movieId) => {
  const movies = await listMovies();
  const movieIndex = movies.findIndex(
    (movie) => JSON.stringify(movieId) === JSON.stringify(movie.id)
  );
  if (movieIndex === -1) null;
  const [result] = movies.splice(movieIndex, 1);
  updateContact(movies);
  return result;
};

const addMovie = async (body) => {
  const movies = await listMovies();
  const newMovie = {
    id: objectId(),
    ...body,
  };
  movies.push(newMovie);

  updateData(movies);
  return newMovie;
};

const updateMovie = async (movieId, body) => {
  const movies = await listMovies();
  const index = movies.findIndex(
    (movie) => JSON.stringify(movieId) === JSON.stringify(movie.id)
  );
  if (index === -1) null;
  movies[index] = {
    ...body,
    id: movieId,
  };
  return movies[index];
};

module.exports = {
  listMovies,
  getMovieById,
  removeMovie,
  addMovie,
  updateMovie,
};
