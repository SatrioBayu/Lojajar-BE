const express = require("express");
const router = express.Router();
const uploadOnMemory = require("../middleware/multer");
const multipleUpload = uploadOnMemory.fields([{ name: "images", maxCount: 10 }]);
const { authController, articleController, umkmController, suratController } = require("./controller");
const { validate } = require("./validation/validate");
const { login, register, createArticle, createUmkm, createSurat, updateSurat } = require("./validation/bodyValidation");

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
router.get("/article/:id", articleController.getArticle);
router.post("/article", authController.authorize, multipleUpload, createArticle, validate, articleController.createArticle);
router.delete("/article/:id", authController.authorize, articleController.deleteArticle);
router.put("/article/:id", authController.authorize, multipleUpload, createArticle, validate, articleController.updateArticle);

// Umkm
router.get("/umkm", umkmController.getListUmkm);
router.get("/umkm/:id", umkmController.getUmkm);
router.post("/umkm", authController.authorize, multipleUpload, createUmkm, validate, umkmController.createUmkm);
router.delete("/umkm/:id", authController.authorize, umkmController.deleteUmkm);
router.put("/umkm/:id", authController.authorize, multipleUpload, createUmkm, validate, umkmController.updateUmkm);

// Surat
router.get("/surat", suratController.getAllSurat);
router.post("/surat", createSurat, validate, suratController.createSurat);
router.delete("/surat/:id", authController.authorize, suratController.deleteSurat);
router.put("/surat/:id", authController.authorize, updateSurat, validate, suratController.updateSurat);

module.exports = router;
