const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell order name."],
  },
  quantity: {
    type: Number,
    required: [true, "Please tell order quantity"],
  },
  date: {
    type: Date,
    required: [true, "Please tell order date"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
