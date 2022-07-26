const { Article } = require("../models");

const createArticle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { judul, isi } = req.body;
    const article = await Article.create({
      title,
      body,
    });
    res.status(201).send(article);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
