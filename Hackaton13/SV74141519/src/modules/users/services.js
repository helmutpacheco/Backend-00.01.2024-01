const { request, response } = require("express");
const bcrypt = require("bcrypt");

const UserModel = require("./entity");

const createUser = async (req = request, res = response) => {
  let { password, name, email } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "No se envio los datos completos" });
  }

  const saltRounds = Number(process.env.SALT_BCRYPT);
  const salt = bcrypt.genSaltSync(saltRounds);
  password = bcrypt.hashSync(password, salt);

  const newUser = await UserModel.create({ password, name, email });
  newUser.save();
  res.json(newUser);
};

module.exports = {
  createUser,
};
