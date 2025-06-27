const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Offer = require('../models/Offer');
const payfast = require('../utils/payfast');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, offerCode } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Cart is empty'
      });
    }

    // Check if all products are in stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: `Product ${item.name} not found`
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Product ${item.name} is out of stock`
        });
      }
    }

    // Calculate total price
    let totalPrice = cart.totalPrice;

    // Apply offer if provided
    let appliedOffer = null;
    if (offerCode) {
      const offer = await Offer.findOne({ name: offerCode });
      if (offer && offer.isValid() && totalPrice >= offer.minimumPurchaseAmount) {
        const discount = offer.calculateDiscount(totalPrice);
        totalPrice -= discount;
        appliedOffer = offer._id;
        
        // Increment offer usage count
        offer.usedCount += 1;
        await offer.save();
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      shippingAddress,
      paymentMethod,
      totalPrice,
      appliedOffer
    });

    // Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    // Generate PayFast payment data
    const paymentData = payfast.generatePaymentData(order, req.user);

    res.status(201).json({
      success: true,
      data: {
        order,
        paymentData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/v1/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    // Build filter object
    const filter = {};
    if (req.query.status) {
      if (req.query.status === 'paid') {
        filter.isPaid = true;
      } else if (req.query.status === 'unpaid') {
        filter.isPaid = false;
      } else if (req.query.status === 'delivered') {
        filter.isDelivered = true;
      } else if (req.query.status === 'pending') {
        filter.isDelivered = false;
      }
    }

    const count = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('appliedOffer')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      success: true,
      data: orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('appliedOffer');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id })
      .populate('appliedOffer')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      success: true,
      data: orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const { paymentStatus, paymentId } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (paymentStatus === 'COMPLETE') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentId,
        status: paymentStatus,
        update_time: new Date().toISOString(),
        email_address: req.user.email
      };

      const updatedOrder = await order.save();

      res.status(200).json({
        success: true,
        data: updatedOrder
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment was not successful'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (!order.isPaid) {
      return res.status(400).json({
        success: false,
        error: 'Order must be paid before marking as delivered'
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    switch (status) {
      case 'paid':
        order.isPaid = true;
        order.paidAt = Date.now();
        break;
      case 'delivered':
        if (!order.isPaid) {
          return res.status(400).json({
            success: false,
            error: 'Order must be paid before marking as delivered'
          });
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        break;
      case 'cancelled':
        // Restore product stock if order is cancelled
        for (const item of order.items) {
          const product = await Product.findById(item.product);
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }
        order.isPaid = false;
        order.isDelivered = false;
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid status'
        });
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get order statistics (Admin only)
// @route   GET /api/v1/orders/stats
// @access  Private/Admin
const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const deliveredOrders = await Order.countDocuments({ isDelivered: true });
    const pendingOrders = await Order.countDocuments({ isPaid: false });
    
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const monthlyStats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        paidOrders,
        deliveredOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getOrderStats
}; 