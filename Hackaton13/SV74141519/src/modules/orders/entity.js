const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  priceFinal: Number,
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
