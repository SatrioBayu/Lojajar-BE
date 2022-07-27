const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authorize = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).send({
        message: "No token provided",
      });
    }
    const token = auth.split(" ")[1];
    const decodedToken = decodeToken(token);
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).send({
        message: "Username or password is incorrect",
      });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Username or password is incorrect",
      });
    }
    const token = createToken(user);
    res.status(200).send({
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const handleRegister = async (req, res) => {
  try {
    const { username, password, nama } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
      nama,
    });
    res.status(201).send({
      message: "User created",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const createToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { authorize, handleLogin, handleRegister };
