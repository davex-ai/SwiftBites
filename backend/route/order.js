import express from 'express'
import { updateOrderStatus } from '../controller/order';
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getOrder
} = require('../utils/order');

const { protect } = require('../middleware/authMiddleware');

router.post('/orders', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/orders/:id', protect, getOrder);
router.get('/orders/:id', protect, updateOrderStatus);

module.exports = router;
