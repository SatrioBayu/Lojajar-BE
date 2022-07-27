const { Surat } = require("../models");

const getAllSurat = async (req, res) => {
  try {
    const surat = await Surat.findAll();
    res.status(200).send({
      message: "Surat successfully retrieved",
      data: surat,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const createSurat = async (req, res) => {
  try {
    const { nama, nik, email, jenis, keterangan = null } = req.body;
    const surat = await Surat.create({
      nama,
      nik,
      email,
      jenis,
      keterangan,
    });
    res.status(201).send(surat);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateSurat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nik, email, jenis, keterangan = null } = req.body;
    const surat = await Surat.findOne({
      where: {
        id,
      },
    });
    if (!surat) {
      return res.status(404).send({
        message: "Surat not found",
      });
    }

    await surat.update({
      nama,
      nik,
      email,
      jenis,
      keterangan,
    });
    res.status(200).send({
      message: "Surat berhasil diubah",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteSurat = async (req, res) => {
  try {
    const { id } = req.params;
    const surat = await Surat.findOne({
      where: {
        id,
      },
    });
    if (!surat) {
      return res.status(404).send({
        message: "Surat not found",
      });
    }

    await surat.destroy();

    res.status(200).send({
      message: "Surat berhasil dihapus",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getAllSurat, createSurat, updateSurat, deleteSurat };
