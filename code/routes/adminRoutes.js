const express = require('express');
const router = express.Router();
const {
  getStats,
  getUsers,
  updateUserRole,
  toggleUserBan,
  getOrders,
  updateOrderStatus
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard stats
router.get('/stats', getStats);

// User management
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/ban', toggleUserBan);

// Order management
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router; 