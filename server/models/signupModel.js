const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({

    firstName:String,
    lastName:String,
    userName:String,
    email:String,
    password:String,
    phone:String,

})

const User = new mongoose.model("user",signupSchema);

module.exports =  User;