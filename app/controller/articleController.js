const { Article, ArticleImage } = require("../models");
const cloudinary = require("../../middleware/cloudinary");

const createArticle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { judul, isi } = req.body;

    const article = await Article.create({
      userId,
      judul,
      isi,
    });

    if (req.files) {
      const uploadedFiles = await uploadMultipleFiles(req, res);
      const articleImages = uploadedFiles.map((file) => {
        return {
          articleId: article.id,
          image: file.url,
          publicId: file.public_id,
        };
      });
      await ArticleImage.bulkCreate(articleImages);
    }

    res.status(201).send({
      message: "Article created",
      data: article,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const uploadMultipleFiles = async (req, res) => {
  const uploadedFile = req.files.images.map((file) => {
    const fileBase64 = file.buffer.toString("base64");
    const fileUpload = `data:${file.mimetype};base64,${fileBase64}`;

    return cloudinary.uploader.upload(fileUpload, (err, result) => {
      if (err) {
        return res.status(500).send({
          message: err.message,
        });
      }
      return result;
    });
  });
  return uploadedFile;
};

module.exports = { createArticle };
