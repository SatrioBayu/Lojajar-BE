const { Article, ArticleImage } = require("../models");
const cloudinary = require("../../middleware/cloudinary");

const getListArticle = async (req, res) => {
  try {
    const article = await Article.findAll({
      where: {
        deletedAt: null,
      },
      include: [
        {
          model: ArticleImage,
        },
      ],
    });

    res.status(200).send({
      message: "Article successfully fetched",
      data: article,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

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
      const data = await uploadMultipleFiles(req, res);
      const uploadedFiles = await Promise.all(data);
      const articleImages = uploadedFiles.map((file) => {
        return {
          articleId: article.id,
          image: file.url,
          publicId: file.public_id,
        };
      });
      await ArticleImage.bulkCreate(articleImages);
    }

    const result = await Article.findOne({
      where: {
        id: article.id,
      },
      include: [
        {
          model: ArticleImage,
        },
      ],
    });

    res.status(201).send({
      message: "Article created",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;

    const article = await Article.findOne({
      where: {
        id,
      },
    });

    if (!article) {
      return res.status(404).send({
        message: "Article not found",
      });
    }

    await article.update({
      judul,
      isi,
    });

    if (req.files.images) {
      const articlesImages = await ArticleImage.findAll({
        where: {
          articleId: article.id,
        },
      });
      if (articlesImages) {
        await Promise.all(
          articlesImages.map(async (image) => {
            await cloudinary.uploader.destroy(image.publicId);
            await image.destroy();
          })
        );
      }

      const data = await uploadMultipleFiles(req, res);
      const uploadedFiles = await Promise.all(data);
      const articleImages = uploadedFiles.map((file) => {
        return {
          articleId: article.id,
          image: file.url,
          publicId: file.public_id,
        };
      });
      await ArticleImage.bulkCreate(articleImages);
    }

    const result = await Article.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ArticleImage,
        },
      ],
    });

    res.status(200).send({
      message: "Article updated",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findOne({
      where: {
        id,
      },
    });

    if (!article) {
      return res.status(404).send({
        message: "Article not found",
      });
    }

    const articleImages = await ArticleImage.findAll({
      where: {
        articleId: article.id,
      },
    });

    if (articleImages) {
      await Promise.all(
        articleImages.map(async (image) => {
          await cloudinary.uploader.destroy(image.publicId);
          await image.destroy();
        })
      );
    }

    await article.update({
      deletedAt: new Date(),
    });

    res.status(200).send({
      message: "Article deleted",
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

module.exports = { getListArticle, createArticle, deleteArticle, updateArticle };
