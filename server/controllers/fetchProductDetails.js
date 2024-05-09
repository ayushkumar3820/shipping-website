const  Product = require("../models/product-schema");

const fetchProductDetails  = async (req,res)=>{

    const {id} = req.body;
  

    
    // finding the product from DB:
    try{

        const data = await Product.findOne({id:id});
      
        
        res.status(200).json(
            {productDetails:data}
        )

    }
    catch(e){
        res.status(501).json({msg:"Error in fetching Data"})
    }

}

module.exports = fetchProductDetails;