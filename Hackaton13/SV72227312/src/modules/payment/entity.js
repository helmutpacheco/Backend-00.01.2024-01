const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },

});

const PaymentModel = mongoose.model('Payment', PaymentSchema);

module.exports = PaymentModel;