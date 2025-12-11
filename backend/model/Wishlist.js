const mongoose = require("mongoose")

const wishlistSchema = mongoose.Schema({
    name: { type: String, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
    //i dk what else to add
})
module.exports = mongoose.model("WishList", wishlistSchema);