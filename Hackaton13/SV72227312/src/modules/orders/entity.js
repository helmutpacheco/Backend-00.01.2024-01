const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' }, 
    priceFinal: Number,

    
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;