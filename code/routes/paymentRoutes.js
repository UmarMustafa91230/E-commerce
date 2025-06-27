const express = require('express');
const router = express.Router();
const {
  handlePayFastCallback,
  handlePayFastReturn,
  handlePayFastCancel,
  generateTestData
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

// PayFast routes
router.post('/payfast/notify', handlePayFastCallback);
router.get('/payfast/return', handlePayFastReturn);
router.get('/payfast/cancel', handlePayFastCancel);

// Test data route (admin only)
router.get('/payfast/test-data/:orderId', protect, authorize('admin'), generateTestData);

module.exports = router; 