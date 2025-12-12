import User from "../model/User.js";
import Product from "../model/Product.js";
import { connectDB } from "./db.js";

export async function addItemToCart(userId, productId, quantity) {
    await connectDB();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const itemIndex = user.cart.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
        user.cart[itemIndex].quantity += quantity;
    } else {
        user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return user.cart;
}

export async function removeItemFromCart(userId, productId) {
    await connectDB();

    return await User.findByIdAndUpdate(
        userId,
        { $pull: { cart: { product: productId } } },
        { new: true }
    );
}

export async function updateCartItemQuantity(userId, productId, quantity) {
    await connectDB();

    return await User.findOneAndUpdate(
        { _id: userId, "cart.product": productId },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
    );
}

export async function getUserCart(userId) {
    await connectDB();

    return await User.findById(userId).populate("cart.product");
}

export async function clearCart(userId) {
    await connectDB();

    return await User.findByIdAndUpdate(
        userId,
        { $set: { cart: [] } },
        { new: true }
    );
}
