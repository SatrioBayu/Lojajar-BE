const { body } = require("express-validator");

module.exports = {
  login: [
    body("username").notEmpty().withMessage({
      message: "Username is required",
    }),
    body("password").notEmpty().withMessage({
      message: "Password is required",
    }),
    body("username").isLength({ min: 6 }).withMessage({
      message: "Username must be at least 6 characters",
    }),
  ],
  register: [
    body("username").notEmpty().withMessage({
      message: "Username is required",
    }),
    body("password").notEmpty().withMessage({
      message: "Password is required",
    }),
    body("username").isLength({ min: 6 }).withMessage({
      message: "Username must be at least 6 characters",
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
  createUmkm: [
    body("nama").notEmpty().withMessage({
      message: "Nama is required",
    }),
    body("jenis").notEmpty().withMessage({
      message: "Jenis is required",
    }),
    body("alamat").notEmpty().withMessage({
      message: "Alamat is required",
    }),
    body("noHp").notEmpty().withMessage({
      message: "No Hp is required",
    }),
    body("noHp").isMobilePhone("id-ID").withMessage({
      message: "No Hp must be in Indonesia",
    }),
    body("deskripsi").notEmpty().withMessage({
      message: "Deskripsi is required",
    }),
  ],
  createSurat: [
    body("nama").notEmpty().withMessage({
      message: "Nama is required",
    }),
    body("nik").notEmpty().withMessage({
      message: "NIK is required",
    }),
    body("namaPemohon").notEmpty().withMessage({
      message: "namaPemohon is required",
    }),
    body("nikPemohon").notEmpty().withMessage({
      message: "nikPemohon is required",
    }),
    body("noWa").notEmpty().withMessage({
      message: "noWa is required",
    }),
    body("jenis").notEmpty().withMessage({
      message: "Jenis is required",
    }),
  ],
  updateSurat: [
    body("status").notEmpty().withMessage({
      message: "Status is required",
    }),
  ],
};
