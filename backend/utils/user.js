import User from "../model/User";
 import { connectDB } from "./db";

export async function registerUser({data}) {
    await connectDB()
    return await User.create(data)  
}

export async function loginUser(email) {
    await connectDB();
    return await User.findOne({ email });
}

export async function getProfile(id) {
    await connectDB()
    return await User.findById(id).select("-password")
}

export async function updateProfile(id, data) {
    await connectDB()
    return await User.findByIdAndUpdate(id, data,{new: true})
}