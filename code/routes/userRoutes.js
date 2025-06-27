const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Import user controller functions
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword
} = require('../controllers/userController');

// Public routes for OTP and password reset
router.post('/sentOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/resetPassword', resetPassword);

// Protect all routes
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

// Admin only routes
router.use(authorize('admin'));
router.get('/', getAllUsers);
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router; 