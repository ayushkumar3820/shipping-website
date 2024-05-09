const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    username: {
        type: String,
    },
    orders: [],
    
   
})

const Order = new mongoose.model("order",orderSchema);

module.exports = Order;