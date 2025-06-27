const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updateData = { name, email, phone };

    // Handle avatar upload if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.avatar = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateData = { name, email, role };

    // Handle avatar upload if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.avatar = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Delete avatar from cloudinary if exists
    if (user.avatar && user.avatar !== 'default-avatar.jpg') {
      const publicId = user.avatar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Send OTP for password reset
// @route   POST /api/v1/users/sentOtp
// @access  Public
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    // Send OTP via email
    await sendEmail(user.email, 'Your OTP Code', `Your One-Time Password (OTP) is: ${otp}. It will expire in 10 minutes`);
    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/v1/users/verifyOtp
// @access  Public
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ success: false, error: 'OTP not requested' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, error: 'OTP expired' });
    }
    res.status(200).json({ success: true, message: 'OTP verified' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Reset password using OTP
// @route   POST /api/v1/users/resetPassword
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ success: false, error: 'OTP not requested' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, error: 'OTP expired' });
    }
    // Set new password (let pre-save hook hash it)
    user.password = newPassword;
    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/v1/users/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }
    
    // Set new password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 