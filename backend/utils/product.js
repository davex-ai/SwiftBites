import Product from "../model/Product";
import { connectDB } from "./db";

export async function getProducts() {
    await connectDB()
    return await Product.find()  
}

export async function getProduct(id) {
    await connectDB()
    return await Product.findById(id)  
}

export async function getProductsByCategory(category) {
    await connectDB() 
    return await Product.find({ category })  
}

export async function createProduct(data) {
    await connectDB()
    return await Product.create(data) 
}

export async function updateProduct(id, data) {
    await connectDB()
    return await Product.findByIdAndUpdate(id, data,{new: true})
}

export async function deleteProduct(id) {
    await connectDB();
    return await Product.findByIdAndDelete(id);
}