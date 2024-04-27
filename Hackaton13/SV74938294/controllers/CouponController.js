const Coupon = require('../models/Coupon');

const couponController = {
  // Obtener todos los cupones
  getAllCoupons: async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener un cupón por su ID
  getCouponById: async (req, res) => {
    const { id } = req.params;
    try {
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: 'Cupón no encontrado' });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo cupón
  createCoupon: async (req, res) => {
    const couponData = req.body;
    try {
      const newCoupon = new Coupon(couponData);
      await newCoupon.save();
      res.status(201).json(newCoupon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar un cupón existente
  updateCoupon: async (req, res) => {
    const { id } = req.params;
    const couponData = req.body;
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(id, couponData, { new: true });
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Cupón no encontrado' });
      }
      res.json(updatedCoupon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un cupón existente
  deleteCoupon: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
      if (!deletedCoupon) {
        return res.status(404).json({ message: 'Cupón no encontrado' });
      }
      res.json({ message: 'Cupón eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = couponController;
