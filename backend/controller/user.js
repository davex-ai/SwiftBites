import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {createUser, findUserByEmail, findUserProfile, modifyUserProfile} from "../utils/user.js";

const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

 export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await findUserByEmail(email);
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, password: hashed });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id)
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id)
    });
});

export const getProfile = asyncHandler(async (req, res) => {
    const user = await findUserProfile(req.user._id);
    res.json(user);
});

// UPDATE PROFILE
export const updateProfile = asyncHandler(async (req, res) => {
    const updated = await modifyUserProfile(req.user._id, req.body);
    res.json(updated);
});
