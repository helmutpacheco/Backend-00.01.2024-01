const Coupon = require('../models/Coupon');

exports.createCoupon = async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear cupón de descuento' });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cupones de descuento' });
  }
};

exports.getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón de descuento no encontrado' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cupón de descuento' });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Cupón de descuento no encontrado' });
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar cupón de descuento' });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Cupón de descuento no encontrado' });
    }
    res.status(200).json({ message: 'Cupón de descuento eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar cupón de descuento' });
  }
};
