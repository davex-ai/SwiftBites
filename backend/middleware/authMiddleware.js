import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { connectDB } from "../utils/db.js";

export const protect = async (req, res, next) => {
    await connectDB();

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else if (req.headers["google-id"]) {
        // Optional Google login
        const user = await User.findOne({ googleId: req.headers["google-id"] });
        if (!user) return res.status(401).json({ message: "Google ID not recognized" });
        req.user = user;
        next();
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
