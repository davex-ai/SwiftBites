import express from 'express'
const router = express.Router();
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist
} = require('../utils/wishlist');

const { protect } = require('../middleware/authMiddleware');

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/remove', protect, addToWishlist);
router.delete('/wishlist/add', protect, removeFromWishlist);

module.exports = router;
