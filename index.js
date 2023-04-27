const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/movie-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define movie schema
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date, required: true, max: Date.now },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Define user model
const User = mongoose.model("User", userSchema);

// Define movie model
const Movie = mongoose.model("Movie", movieSchema);

// Define JWT secret
const jwtSecret = "secret";

// Define JWT expiration time
const jwtExpirationTime = "1h";

// Define Joi validation schema for movie data
const movieSchemaValidation = Joi.object({
  name: Joi.string().required(),
  director: Joi.string().required(),
  releaseDate: Joi.date().max("now").required(),
});

// Define universal error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
};

// Define middleware to check if user is authenticated
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

// Define routes

// User registration
app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate request data
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ username, email, password });
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Check if email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).send("Email already registered");
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.send("User registered successfully");
  } catch (err) {
    next(err);
  }
});

// User login (authentication)
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validate request data
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ email, password });
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Check if user with email exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("Invalid email or password");
      return;
    }

    // Check if password is correct
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      res.status(400).send("Invalid email or password");
      return;
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: jwtExpirationTime,
    });

    res.send({ token });
  } catch (err) {
    next(err);
  }
});

// Get all movies (with pagination)
app.get("/movies", authenticate, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const movies = await Movie.find()
      .populate("addedBy")
      .skip(startIndex)
      .limit(limit);
    const totalMovies = await Movie.countDocuments();

    const results = {};
    results.movies = movies;
    if (endIndex < totalMovies) {
      results.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }

    res.send(results);
  } catch (err) {
    next(err);
  }
});

// Get a movie by ID
app.get("/movies/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("addedBy");
    if (!movie) {
      res.status(404).send("Movie not found");
      return;
    }

    res.send(movie);
  } catch (err) {
    next(err);
  }
});

// Add a new movie
app.post("/movies", authenticate, async (req, res, next) => {
  try {
    const { name, director, releaseDate } = req.body;
    // Validate request data
    const { error } = movieSchemaValidation.validate({
      name,
      director,
      releaseDate,
    });
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Create new movie
    const movie = new Movie({
      name,
      director,
      releaseDate,
      addedBy: req.user.userId,
    });
    await movie.save();

    res.send("Movie added successfully");
  } catch (err) {
    next(err);
  }
});

// Update a movie by ID
router.put("/movies/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, director, releaseDate } = req.body;
    // Validate request body
    const schema = Joi.object({
      name: Joi.string().required(),
      director: Joi.string().required(),
      releaseDate: Joi.date().max("now").required(),
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res.status(400).send(validationRes.error.details[0].message);
    }

    // Check if movie exists
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    // Update movie
    movie.name = name;
    movie.director = director;
    movie.releaseDate = releaseDate;
    movie.modifiedBy = req.user.username;
    movie.modifiedAt = new Date();

    // Save updated movie to database
    await movie.save();

    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Get a movie by ID
router.get("/movies/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    // Check if movie exists
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
