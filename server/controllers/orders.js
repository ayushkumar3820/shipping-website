const Order = require("../models/order-model");

const orders = async (req, res) => {

    const { username } = req.body;

    if (username) {

            try{
                const items = await Order.findOne({username})
                if(items){
                    res.status(200).json({order:items.orders})
                }else{
                    res.status(200).json({order:[]})
                }
               

            }catch(e){
                console.log(e);
                res.status(501).json({msg:"Internal Server Error"})
            }

    }



}

module.exports = orders;