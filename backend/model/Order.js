const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    name: { type: String, required: true},
    userId: {type: String, type: mongoose.Schema.Types.ObjectId}, ref: "User" ,
    paid: {type: Boolean, default: false}, 
    
})
module.exports = mongoose.model("Order", orderSchema);