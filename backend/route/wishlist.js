import express from 'express'
const router = express.Router();
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist
} = require('../utils/wishlist');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getWishlist);
router.post('/:productId', protect, addToWishlist);
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
