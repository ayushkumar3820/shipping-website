const Order = require("../models/order-model");
const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_API_KEY,
  key_secret: process.env.RAZOR_PAY_API_SECRET,
});

const buyProduct = async (req, res) => {
  const { product } = req.body;

  const receipt = `order_${generateUniqueId()}`; 
  
  const options = {
    amount: Number(product.price.cost) * 100,
    currency: "INR",
    receipt: receipt,
  };

  try {
    const order = await instance.orders.create(options);

    res.status(200).json({ order: order, key: process.env.RAZOR_PAY_API_KEY, receipt: receipt });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function generateUniqueId() {
  return Date.now().toString(); 
}

module.exports = buyProduct;
