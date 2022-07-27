const express = require("express");
const router = express.Router();
const uploadOnMemory = require("../middleware/multer");
const multipleUpload = uploadOnMemory.fields([{ name: "images", maxCount: 10 }]);
const { authController, articleController, umkmController } = require("./controller");
const { validate } = require("./validation/validate");
const { login, register, createArticle, createUmkm } = require("./validation/bodyValidation");

router.get("/", (req, res) => {
  res.send({
    message: "Server running",
  });
});

// Authentication
router.post("/login", login, validate, authController.handleLogin);
router.post("/register", register, validate, authController.handleRegister);

// Article
router.get("/article", articleController.getListArticle);
router.post("/article", authController.authorize, multipleUpload, createArticle, validate, articleController.createArticle);
router.delete("/article/:id", authController.authorize, articleController.deleteArticle);
router.put("/article/:id", authController.authorize, multipleUpload, createArticle, validate, articleController.updateArticle);

// Umkm
router.get("/umkm", umkmController.getListUmkm);
router.post("/umkm", authController.authorize, multipleUpload, createUmkm, validate, umkmController.createUmkm);
router.delete("/umkm/:id", authController.authorize, umkmController.deleteUmkm);
router.put("/umkm/:id", authController.authorize, multipleUpload, createUmkm, validate, umkmController.updateUmkm);

module.exports = router;
