const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("username", "Username is required").notEmpty(),
    body("password", "Password must be 6 characters or longer").isLength({ min: 6 }),
  ],
  register
);

router.post(
  "/login",
  [
    body("username", "Username is required").notEmpty(),
    body("password", "Password is required").exists(),
  ],
  login
);

module.exports = router;
