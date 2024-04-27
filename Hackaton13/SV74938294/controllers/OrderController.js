const Order = require('../models/Order');

const orderController = {
  // Obtener todas las órdenes
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener una orden por su ID
  getOrderById: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear una nueva orden
  createOrder: async (req, res) => {
    const orderData = req.body;
    try {
      const newOrder = new Order(orderData);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar una orden existente
  updateOrder: async (req, res) => {
    const { id } = req.params;
    const orderData = req.body;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar una orden existente
  deleteOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      res.json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = orderController;
