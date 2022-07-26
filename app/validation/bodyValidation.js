const { body } = require("express-validator");

module.exports = {
  login: [
    body("email").notEmpty().withMessage({
      message: "Email is required",
    }),
    body("password").notEmpty().withMessage({
      message: "Password is required",
    }),
    body("email").isEmail().withMessage({
      message: "Email is not valid",
    }),
  ],
  register: [
    body("email").notEmpty().withMessage({
      message: "Email is required",
    }),
    body("password").notEmpty().withMessage({
      message: "Password is required",
    }),
    body("nama").notEmpty().withMessage({
      message: "Nama is required",
    }),
    body("email").isEmail().withMessage({
      message: "Email is not valid",
    }),
    body("password").isLength({ min: 6 }).withMessage({
      message: "Password must be at least 6 characters",
    }),
  ],
  createArticle: [
    body("judul").notEmpty().withMessage({
      message: "Judul is required",
    }),
    body("isi").notEmpty().withMessage({
      message: "Isi is required",
    }),
  ],
};
