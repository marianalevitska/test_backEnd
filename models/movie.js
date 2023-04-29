const Joi = require("joi");

const { Schema, model } = require("mongoose");

const directorRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const titleRegExp =
  /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/;

const movieScheme = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for movie"],
      match: titleRegExp,
    },
    director: {
      type: String,
      required: [true, "Set name for director"],
      match: directorRegExp,
    },
    date: {
      type: Date,
      required: true,
      max: Date.now,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const moviesScheme = Joi.object({
  title: Joi.string().required().pattern(titleRegExp),
  director: Joi.string().required().pattern(directorRegExp),
  date: Joi.date().max("now").required(),
  favorite: Joi.boolean().default(false),
});

const statusScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

const Movie = model("contact", movieScheme);

const schemas = {
  movieInfo: moviesScheme,
  favorite: statusScheme,
};

module.exports = {
  Movie,
  schemas,
};
