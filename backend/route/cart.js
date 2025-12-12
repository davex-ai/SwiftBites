import express from 'express'
import { addToCart, clearUserCart, getCart, removeFromCart, updateCartItem } from '../controller/cart';
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.post('/cart', protect, addToCart);
router.delete('/cart', protect, removeFromCart);
router.get('/my-cart', protect, getCart);
router.patch('/cart/:id', protect, updateCartItem);
router.delete('/cart-clear', protect, clearUserCart);

module.exports = router;
