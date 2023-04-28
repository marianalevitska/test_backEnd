const express = require("express");

const { isValidId, validateBody, authorization } = require("../../middleware");

const Joi = require("joi");

const {
  listMovies,
  getMovieById,
  removeMovie,
  addMovie,
  updateMovie,
} = require("../../models/movies");
const { createError } = require("../../helpers");

const router = express.Router();

const moviesScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
