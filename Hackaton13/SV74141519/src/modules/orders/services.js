const { request, response } = require("express");
const UserModel = require("../users/entity");
const OrderModel = require("./entity");

const createOrder = async (req = request, res = response) => {
  const { user } = req.body;

  const existUser = await UserModel.findById(user);

  if (!existUser) {
    res.status(400).json({ message: "Cliente no existe" });
  }

  /// processo
  ///buscar curso

  // validar cupo

  // restar rescuento

  //crear venta

  //asignar a usuario

  const priceFinal = 102;

  const newOrder = await OrderModel.create({
    user: existUser._id,
    priceFinal,
  });
  newOrder.save();

  res.json(newOrder);
};

const allOrders = async (req = request, res = response) => {
  const result = await OrderModel.find({}).populate({
    path: "user",
    model: "User",
  });

  res.json(result);
};

module.exports = {
  createOrder,
  allOrders,
};
