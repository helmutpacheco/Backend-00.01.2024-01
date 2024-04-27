const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  // Otros campos según tus necesidades
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
