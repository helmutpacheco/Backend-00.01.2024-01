const { request, response } = require("express");
const UserModel = require("../users/entity");
const OrderModel = require("./entity");
const CourseModel = require("../courses/entity"); 

const createOrder = async (req = request, res = response) => {
  const { user, courseId } = req.body;

  try {
    const existUser = await UserModel.findById(user);
    if (!existUser) {
      return res.status(404).json({ message: "Cliente no existe" });
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    if (course.cupoDisponible <= 0) {
      return res.status(400).json({ message: "No hay cupos disponibles para este curso" });
    }

    const discount = getDiscountForUser(user);
    const priceFinal = course.precio - discount;

    course.cupoDisponible -= 1; 
    await course.save();

    const newOrder = new OrderModel({
      user: existUser._id,
      course: course._id,
      priceFinal
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
};

const allOrders = async (req = request, res = response) => {
  try {
    const result = await OrderModel.find({})
      .populate('user')
      .populate('course', 'nombreCurso precio');
    res.json(result);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: "Error al obtener las órdenes" });
  }
};

function getDiscountForUser(userId) {
  return 20; 
}

module.exports = {
  createOrder,
  allOrders,
};