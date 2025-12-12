import User from "../model/User.js";
import { connectDB } from "../utils/db.js";

export async function createUser(data) {
    await connectDB();
    return await User.create(data);
}

export async function findUserByEmail(email) {
    await connectDB();
    return await User.findOne({ email });
}

export async function findUserProfile(id) {
    await connectDB();
    return await User.findById(id).select("-password");
}

export async function modifyUserProfile(id, data) {
    await connectDB();
    return await User.findByIdAndUpdate(id, data, { new: true });
}
