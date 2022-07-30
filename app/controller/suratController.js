const { Surat } = require("../models");
const nodeMailer = require("nodemailer");

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
      status: "Diproses",
    });
    // const transporter = nodeMailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "mnoble350@gmail.com",
    //     pass: "ekrnlbfqxwxmvmza",
    //   },
    // });
    // const mailOptions = {
    //   from: "mnoble350@gmail.com",
    //   to: email,
    //   subject: "Surat Keterangan",
    //   text: `Hai ${nama},
    //   Terima kasih atas permintaan anda untuk mengirimkan surat keterangan.
    //   Berikut kami lampirkan file surat yang anda minta.
    //   Salam,
    //   Admin`,
    //   attachments: [
    //     {
    //       filename: "surat.pdf",
    //       path: "./public/CV.pdf",
    //     },
    //   ],
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    res.status(200).send({
      message: "Surat berhasil dibuat",
      data: surat,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateSurat = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
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
      status,
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
