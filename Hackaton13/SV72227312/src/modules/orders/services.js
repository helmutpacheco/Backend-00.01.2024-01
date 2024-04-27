const {request, response} = require("express");
const UserModel = require("../users/entity");
const CourseModel = require("../courses/entity");
const CouponModel = require("../coupon/entity");
const OrderModel = require("./entity");


const createOrder = async(req = request, res = response) => {
    // Extraer user y course del cuerpo de la solicitud
    const { user, course, coupon } = req.body;

    // Verificar si el usuario existe
    const existUser = await UserModel.findById(user);
    if (!existUser) {
        return res.status(400).json({ message: "Usuario no existe" });
    }

    // Verificar si el curso existe
    const existCourse = await CourseModel.findById(course);
    if (!existCourse) {
        return res.status(400).json({ message: "Curso no existe" });
    }

    // Verificar si el cupon existe
    const existCoupon = await CouponModel.findById(coupon);
    if (!existCoupon) {
        return res.status(400).json({ message: "Cupon no existe" });
    }

    const priceFinal = Math.max(0, existCourse.price - existCoupon.discount); 

    try {
        const newOrder = await OrderModel.create({
            user: existUser._id,
            course: existCourse._id,
            coupon: existCoupon._id,
            priceFinal
        });

        res.json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findOneOrder = async(req = request, res = response) => {
    const {id} = req.params;
    console.log(id);

    try {
        const order = await OrderModel.findById(id)
        .populate("user", "name DNI email") 
        .populate("course", "name price")
        .populate("coupon", "code discount");

        if (!order) {
            return res.status(404).json({message: "La orden no existe."});
        }

        res.json(order);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: "Error al buscar la orden"});
    }
};

const findAllOrder = async(req = request, res = response) => {
    const result = await OrderModel.find({})
        .populate("user", "name DNI email") 
        .populate("course", "name price")
        .populate("coupon", "code discount"); 
    res.json(result);
};
const deleteOrder = async(req = request, res = response) => {
    const {id} = req.params;

    try {
        const existCourse = await OrderModel.findByIdAndDelete(id);

        if (!existCourse) {
            return res.status(400).json({message: "La orden no existe."});
        }
        return res.json(existCourse);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateOrder = async (req = request, res = response) => {
    const { id } = req.params;  
    const orderData = req.body; 

    try {
    
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, orderData, {
            new: true,  
            runValidators: true  
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: "La orden no existe." });
        }
        return res.json(updatedOrder);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createOrder,
    findOneOrder,
    findAllOrder,
    deleteOrder,
    updateOrder,
}