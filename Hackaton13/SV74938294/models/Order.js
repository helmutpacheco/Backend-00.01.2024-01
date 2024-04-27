const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }, // Referencia al cupón de descuento
  // Otros campos según tus necesidades
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
