const mongoose = require("mongoose");
 const Connection  = async ()=>{

    try{
       
     //const connect = await mongoose.connect("mongodb+srv://ridhamanand31:Lionelmessi10@flipkartclone.kjph07z.mongodb.net/?retryWrites=true&w=majority")
      const connect = await mongoose.connect("mongodb+srv://ayush:ayush@cluster0.bj7v6l2.mongodb.net/")
     console.log("DataBase Connected Successfully")
    }
    catch(e){
        console.log(`DataBase Connection Error ${e}`)
    }

}

module.exports = Connection;