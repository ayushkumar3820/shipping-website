const Product = require("../models/product-schema");

const fetchProducts = async (req,res)=>{

    // fetching Products from mongoDB

    try{
        const fetchedProducts = await Product.find({});
        res.status(200).json({products:fetchedProducts});
    }
    catch(e){
        console.log(e);
        res.status(500).json({msg:"Error While Fetching Products from MongoDB"})
    }

}


module.exports = fetchProducts;