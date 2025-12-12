import Order from "../model/Order";
import { connectDB } from "./db";

export async function placeOrder(data) {
    await connectDB()
    return await Order.create(data)  
}

export async function getMyOrders(userId) {
    await connectDB()
    return await Order.find({user: userId})
}
export async function getOrder(id) {
    await connectDB()
    return await Order.findById(id)
}