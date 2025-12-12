import express from 'express'
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getOrder
} = require('../utils/order');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrder);

module.exports = router;
