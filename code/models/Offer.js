const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide offer name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide offer description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  discountPercentage: {
    type: Number,
    required: [true, 'Please provide discount percentage'],
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot be more than 100%']
  },
  active: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date']
  },
  bannerImage: {
    type: String,
    required: [true, 'Please provide banner image URL']
  },
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicableCategories: [{
    type: String
  }],
  minimumPurchaseAmount: {
    type: Number,
    default: 0
  },
  maximumDiscountAmount: {
    type: Number
  },
  usageLimit: {
    type: Number,
    default: -1 // -1 means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Validate end date is after start date
offerSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

// Check if offer is valid
offerSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.active &&
    now >= this.startDate &&
    now <= this.endDate &&
    (this.usageLimit === -1 || this.usedCount < this.usageLimit)
  );
};

// Calculate discount amount
offerSchema.methods.calculateDiscount = function(amount) {
  if (!this.isValid()) return 0;
  
  let discount = (amount * this.discountPercentage) / 100;
  
  if (this.maximumDiscountAmount && discount > this.maximumDiscountAmount) {
    discount = this.maximumDiscountAmount;
  }
  
  return discount;
};

module.exports = mongoose.model('Offer', offerSchema); 