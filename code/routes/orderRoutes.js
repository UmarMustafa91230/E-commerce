const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getOrderStats
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Create order
router.post('/', createOrder);

// Get user's orders
router.get('/myorders', getMyOrders);

// Get order statistics (admin only)
router.get('/stats', authorize('admin'), getOrderStats);

// Get all orders (admin only)
router.get('/', authorize('admin'), getAllOrders);

// Get order by ID
router.get('/:id', getOrderById);

// Update order to paid
router.put('/:id/pay', updateOrderToPaid);

// Update order to delivered (admin only)
router.put('/:id/deliver', authorize('admin'), updateOrderToDelivered);

// Update order status (admin only)
router.put('/:id/status', authorize('admin'), updateOrderStatus);

module.exports = router; 