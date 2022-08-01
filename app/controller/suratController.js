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
    const { nama, nik, namaPemohon, nikPemohon, noWa, jenis, keterangan = null } = req.body;
    const surat = await Surat.create({
      nama,
      nik,
      namaPemohon,
      nikPemohon,
      noWa,
      jenis,
      keterangan,
      status: "Diproses",
    });
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

    // const transporter = nodeMailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "mnoble350@gmail.com",
    //     pass: "ekrnlbfqxwxmvmza",
    //   },
    // });
    // const mailOptions = {
    //   from: "mnoble350@gmail.com",
    //   to: surat.email,
    //   subject: "Surat Keterangan",
    //   text: `Hai ${surat.nama},
    //   Terima kasih atas permintaan anda untuk mengirimkan surat keterangan.
    //   Berikut kami lampirkan file surat yang anda minta.
    //   Salam,
    //   Admin`,
    //   attachments: [
    //     {
    //       filename: "surat.jpg",
    //       path: "https://res.cloudinary.com/dgr7ck0sl/image/upload/v1658826939/cld-sample-5.jpg",
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
