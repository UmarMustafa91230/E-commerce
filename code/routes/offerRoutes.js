const express = require('express');
const router = express.Router();
const {
  createOffer,
  getOffers,
  getActiveOffers,
  getOffer,
  updateOffer,
  deleteOffer
} = require('../controllers/offerController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/active', getActiveOffers);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getOffers)
  .post(upload.single('bannerImage'), createOffer);

router.route('/:id')
  .get(getOffer)
  .put(upload.single('bannerImage'), updateOffer)
  .delete(deleteOffer);

module.exports = router; 