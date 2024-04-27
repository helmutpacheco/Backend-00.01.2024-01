const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  courses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    coursePrice: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'completada'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;