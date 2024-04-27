const Order = require('../models/Order');
const PaymentController = require('../controllers/paymentController');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    // Procesar el pago y obtener la respuesta
    const paymentResponse = await PaymentController.processPayment(req.body);
    // Actualizar la orden con la información del pago
    newOrder.payment = paymentResponse;
    // Guardar la orden actualizada en la base de datos
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear orden de compra' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener órdenes de compra' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener orden de compra' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar orden de compra' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }
    res.status(200).json({ message: 'Orden de compra eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar orden de compra' });
  }
};
