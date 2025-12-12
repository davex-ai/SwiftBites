 import express from 'express'
 import { createNotification, getNotifications, markAsRead, updateOrderStatus } from '../controller/notification';
 const router = express.Router();
 
 const { protect } = require('../middleware/authMiddleware');
 
 router.post('notification', protect, createNotification);
 router.get('/my-notification', protect, getNotifications);
 router.get('/notification/:id', protect,markAsRead);
 
 module.exports = router;
 