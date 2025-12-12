import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    images: [String],
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
