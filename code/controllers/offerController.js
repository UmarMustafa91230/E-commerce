const Offer = require('../models/Offer');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// @desc    Create new offer
// @route   POST /api/v1/offers
// @access  Private/Admin
exports.createOffer = async (req, res) => {
  try {
    const {
      name,
      description,
      discountPercentage,
      startDate,
      endDate,
      applicableProducts,
      applicableCategories,
      minimumPurchaseAmount,
      maximumDiscountAmount,
      usageLimit
    } = req.body;

    // Upload banner image to cloudinary
    let bannerImage = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      bannerImage = result.secure_url;
      // Remove file from uploads folder
      fs.unlinkSync(req.file.path);
    }

    const offer = await Offer.create({
      name,
      description,
      discountPercentage,
      startDate,
      endDate,
      bannerImage,
      applicableProducts,
      applicableCategories,
      minimumPurchaseAmount,
      maximumDiscountAmount,
      usageLimit
    });

    res.status(201).json({
      success: true,
      data: offer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all offers
// @route   GET /api/v1/offers
// @access  Private/Admin
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({
      success: true,
      data: offers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get active offers
// @route   GET /api/v1/offers/active
// @access  Public
exports.getActiveOffers = async (req, res) => {
  try {
    const now = new Date();
    const offers = await Offer.find({
      active: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
      $or: [
        { usageLimit: -1 },
        { $expr: { $lt: ['$usedCount', '$usageLimit'] } }
      ]
    });

    res.status(200).json({
      success: true,
      data: offers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single offer
// @route   GET /api/v1/offers/:id
// @access  Private/Admin
exports.getOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        error: 'Offer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: offer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update offer
// @route   PUT /api/v1/offers/:id
// @access  Private/Admin
exports.updateOffer = async (req, res) => {
  try {
    const {
      name,
      description,
      discountPercentage,
      startDate,
      endDate,
      active,
      applicableProducts,
      applicableCategories,
      minimumPurchaseAmount,
      maximumDiscountAmount,
      usageLimit
    } = req.body;

    let updateData = {
      name,
      description,
      discountPercentage,
      startDate,
      endDate,
      active,
      applicableProducts,
      applicableCategories,
      minimumPurchaseAmount,
      maximumDiscountAmount,
      usageLimit
    };

    // Upload new banner image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.bannerImage = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!offer) {
      return res.status(404).json({
        success: false,
        error: 'Offer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: offer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete offer
// @route   DELETE /api/v1/offers/:id
// @access  Private/Admin
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        error: 'Offer not found'
      });
    }

    // Delete banner image from cloudinary
    if (offer.bannerImage) {
      const publicId = offer.bannerImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Offer.findByIdAndDelete(req.params.id);

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