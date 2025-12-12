import express from "express";
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus
} from "../controller/order.js";

const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/orders", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/orders/:id", protect, getOrderById);
router.patch("/orders/:id", protect, admin, updateOrderStatus);

export default router;
