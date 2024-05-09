const Order = require("../models/order-model")

const placeOrder = async (req,res)=>{

    console.log("-------------------------------");



  const {wishlistIteams,username} = req.body;

  wishlistIteams.map(item=>{
      item.purchasedDate = new Date();
  })



  const data = await Order.findOne({username});
  if(!data){
    const data = new Order({username:username, orders:wishlistIteams})
    await data.save();
    console.log("Order Saved");
  }
  else{
    wishlistIteams.map(item=>data.orders.push(item));
    await data.save();
    console.log("products added");
  }

  res.status(200).json({msg:"success"})

}

module.exports = placeOrder;