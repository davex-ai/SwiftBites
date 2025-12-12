import express from 'express'
const router = express.Router()

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} = require("../utils/user")

const { protect } = require("../middleware/authMiddleware")

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)

module.exports = router