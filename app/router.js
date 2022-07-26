const express = require("express");
const router = express.Router();
const uploadOnMemory = require("../middleware/multer");
const multipleUpload = uploadOnMemory.fields([{ name: "images", maxCount: 10 }]);
const { authController } = require("./controller");
const { validate } = require("./validation/validate");
const { login, register } = require("./validation/bodyValidation");

router.get("/", (req, res) => {
  res.send({
    message: "Server running",
  });
});

// Authentication
router.post("/login", login, validate, authController.handleLogin);
router.post("/register", register, validate, authController.handleRegister);

module.exports = router;
