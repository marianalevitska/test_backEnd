const express = require("express");

const {
  isValidId,
  validateBody,
  authorization,
  upload,
} = require("../../middleware");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");
const path = require("path");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.register),
  ctrlWrapper(ctrl.signUp)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.emailVerify));

router.post(
  "/verify",
  validateBody(schemas.emailVerify),
  ctrlWrapper(ctrl.reVerify)
);

router.post("/login", validateBody(schemas.login), ctrlWrapper(ctrl.signIn));

router.post("/logout", authorization, ctrlWrapper(ctrl.logOut));

router.get("/current", authorization, ctrlWrapper(ctrl.current));

router.patch("/", authorization, ctrlWrapper(ctrl.updateSubscription));

router.patch(
  "/avatar",
  authorization,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatar)
);

module.exports = router;
