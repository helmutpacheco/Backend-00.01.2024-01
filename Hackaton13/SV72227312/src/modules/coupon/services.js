const {request, response} = require("express");
const CouponModel = require("./entity");


const createCoupon = async(req = request, res = response) => {
    try {
        const data = req.body;
        const existCoupon = await CouponModel.findOne({code: data.code});

        if (existCoupon) {
            return res.status(400).json({message: "El cupon ya existe."});
        }

        const newCoupon = await CouponModel.create(data);
        return res.json(newCoupon); 
    } catch (err) {
        return res.status(400).json({message: err.message}); 
    }
};

const findOneCoupon = async(req = request, res = response) => {
    const {id} = req.params;
    console.log(id);

    const existCoupon = await CouponModel.findById(id);

        if(!existCoupon){
            return res.status(400).json({message: "El cupon no existe."});
        }
    res.json(existCoupon);
}

const findAllCoupon = async(req = request, res = response) => {
    const result = await CouponModel.find();
    res.json(result);
}

const deleteCoupon = async(req = request, res = response) => {
    const {id} = req.params;

    try {
        const existCoupon = await CouponModel.findByIdAndDelete(id);

        if (!existCoupon) {
            return res.status(400).json({message: "El cupon no existe."});
        }
        return res.json(existCoupon);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateCoupon = async (req = request, res = response) => {
    const { id } = req.params;  
    const couponData = req.body; 

    try {
    
        const updatedCoupon = await CouponModel.findByIdAndUpdate(id, couponData, {
            new: true,  
            runValidators: true  
        });

        if (!updatedCoupon) {
            return res.status(404).json({ message: "El cupon no existe." });
        }
        return res.json(updatedCoupon);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCoupon,
    findOneCoupon,
    findAllCoupon,
    deleteCoupon,
    updateCoupon,
}