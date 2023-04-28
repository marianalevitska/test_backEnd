const express = require("express");

const { isValidId, validateBody, authorization } = require("../../middleware");
const ctrl = require("../../controllers/movies");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/movie");

const router = express.Router();

router.get("/", authorization, ctrlWrapper(ctrl.getMoviesList));

router.get("/:id", authorization, isValidId, ctrlWrapper(ctrl.getMovieById));

router.post(
  "/",
  authorization,
  validateBody(schemas.contactInfo),
  ctrlWrapper(ctrl.createMovie)
);

router.put(
  "/:id",
  authorization,
  isValidId,
  validateBody(schemas.contactInfo),
  ctrlWrapper(ctrl.updateMovie)
);

router.delete("/:id", authorization, isValidId, ctrlWrapper(ctrl.removeMovie));

router.patch(
  "/:id/favorite",
  authorization,
  isValidId,
  validateBody(schemas.favorite),
  ctrlWrapper(ctrl.updateStatusMovie)
);

module.exports = router;
