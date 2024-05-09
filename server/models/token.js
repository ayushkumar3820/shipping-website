const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    token:String,
})

const Token = new mongoose.model("token",tokenSchema);

module.exports = Token