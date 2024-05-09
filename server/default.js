const products = require("./constants/data")
const Product = require("./models/product-schema")

const defaultData = async ()=>{

    try{

    await Product.insertMany(products);
    console.log("Default Products went successfully");


    }catch(e){
        console.log(`error inserting default data ${e}`);
    }



}

module.exports = defaultData;