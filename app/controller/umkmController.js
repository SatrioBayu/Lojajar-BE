const { Umkm, UmkmImage } = require("../models");
const cloudinary = require("../../middleware/cloudinary");

const getListUmkm = async (req, res) => {
  try {
    const umkm = await Umkm.findAll({
      where: {
        deletedAt: null,
      },
      include: [
        {
          model: UmkmImage,
        },
      ],
    });

    res.status(200).send({
      message: "Umkm successfully retrieved",
      data: umkm,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const createUmkm = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama, jenis, alamat, noHp, deskripsi } = req.body;

    const umkm = await Umkm.create({
      userId,
      nama,
      jenis,
      alamat,
      noHp,
      deskripsi,
    });

    if (req.files.images) {
      const data = await uploadMultipleFiles(req, res);
      const uploadedFiles = await Promise.all(data);
      const umkmImages = uploadedFiles.map((file) => {
        return {
          umkmId: umkm.id,
          image: file.url,
          publicId: file.public_id,
        };
      });
      await UmkmImage.bulkCreate(umkmImages);
    }

    const result = await Umkm.findOne({
      where: {
        id: umkm.id,
      },
      include: [
        {
          model: UmkmImage,
        },
      ],
    });

    res.status(200).send({
      message: "Umkm successfully created",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateUmkm = async (req, res) => {
  try {
    const { nama, jenis, alamat, noHp, deskripsi } = req.body;

    const umkm = await Umkm.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!umkm) {
      return res.status(404).send({
        message: "Umkm not found",
      });
    }

    await umkm.update({
      nama,
      jenis,
      alamat,
      noHp,
      deskripsi,
    });

    if (req.files.images) {
      const umkmImage = await UmkmImage.findAll({
        where: {
          umkmId: umkm.id,
        },
      });
      if (umkmImage) {
        await Promise.all(
          umkmImage.map(async (image) => {
            await cloudinary.uploader.destroy(image.publicId);
            await image.destroy();
          })
        );
      }

      const data = await uploadMultipleFiles(req, res);
      const uploadedFiles = await Promise.all(data);
      const umkmImages = uploadedFiles.map((file) => {
        return {
          umkmId: umkm.id,
          image: file.url,
          publicId: file.public_id,
        };
      });
      await UmkmImage.bulkCreate(umkmImages);
    }

    const result = await Umkm.findOne({
      where: {
        id: umkm.id,
      },
      include: [
        {
          model: UmkmImage,
        },
      ],
    });

    res.status(200).send({
      message: "Umkm successfully updated",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteUmkm = async (req, res) => {
  try {
    const umkm = await Umkm.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!umkm) {
      return res.status(404).send({
        message: "Umkm not found",
      });
    }

    const umkmImage = await UmkmImage.findAll({
      where: {
        umkmId: umkm.id,
      },
    });
    if (umkmImage) {
      await Promise.all(
        umkmImage.map(async (image) => {
          await cloudinary.uploader.destroy(image.publicId);
          await image.destroy();
        })
      );
    }

    await umkm.update({
      deletedAt: new Date(),
    });

    res.status(200).send({
      message: "Umkm successfully deleted",
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

module.exports = { getListUmkm, createUmkm, updateUmkm, deleteUmkm };
