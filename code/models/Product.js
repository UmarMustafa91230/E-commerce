const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    enum: ["Men's Watches", "Women's Watches", "Branded Pre-owned Watches", "Top Brand Original Quality Watches", "Master Copy Watches"]
  },
  brand: {
    type: String,
    required: [true, 'Please provide a product brand']
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  ratings: [reviewSchema],
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for average rating
productSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) {
    return 0;
  }
  const sum = this.ratings.reduce((acc, item) => acc + item.rating, 0);
  return sum / this.ratings.length;
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema); 