const Order = require('../models/Order');
const payfast = require('../utils/payfast');

// @desc    Handle PayFast ITN (Instant Transaction Notification)
// @route   POST /api/v1/payments/payfast/notify
// @access  Public
exports.handlePayFastCallback = async (req, res) => {
  try {
    const data = req.body;
    const signature = data.signature;

    console.log('Received PayFast callback data:', data);
    console.log('Received signature:', signature);

    // Validate the signature
    const isValid = payfast.validateCallback(data, signature);
    console.log('Signature validation result:', isValid);

    if (!isValid) {
      console.error('Invalid signature. Expected:', payfast.generateSignature(data));
      return res.status(400).send('Invalid signature');
    }

    // Get the order
    const order = await Order.findById(data.custom_str1);
    if (!order) {
      console.error('Order not found:', data.custom_str1);
      return res.status(404).send('Order not found');
    }

    // Update order status based on payment status
    if (data.payment_status === 'COMPLETE') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: data.pf_payment_id,
        status: data.payment_status,
        update_time: new Date().toISOString(),
        email_address: data.email_address
      };
      await order.save();
      console.log('Order updated successfully:', order._id);
    }

    // Send response to PayFast
    res.status(200).send('OK');
  } catch (error) {
    console.error('PayFast callback error:', error);
    res.status(500).send('Internal server error');
  }
};

// @desc    Handle PayFast return URL
// @route   GET /api/v1/payments/payfast/return
// @access  Public
exports.handlePayFastReturn = async (req, res) => {
  try {
    const { m_payment_id, payment_status } = req.query;
    
    // Get the order
    const order = await Order.findById(m_payment_id);
    if (!order) {
      console.error('Order not found:', m_payment_id);
      return res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=Order not found`);
    }

    // Update order status if payment is complete
    if (payment_status === 'COMPLETE' && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: m_payment_id,
        status: payment_status,
        update_time: new Date().toISOString()
      };
      await order.save();
    }

    // Log the return URL call
    console.log('PayFast return URL called:', {
      orderId: m_payment_id,
      paymentStatus: payment_status,
      orderStatus: order.isPaid ? 'Paid' : 'Pending'
    });
    
    // Redirect to frontend with payment status and order details
    res.redirect(
      `${process.env.FRONTEND_URL}/payment/status?` +
      `orderId=${m_payment_id}&` +
      `status=${payment_status}&` +
      `isPaid=${order.isPaid}&` +
      `totalAmount=${order.totalPrice}`
    );
  } catch (error) {
    console.error('PayFast return error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=${error.message}`);
  }
};

// @desc    Handle PayFast cancel URL
// @route   GET /api/v1/payments/payfast/cancel
// @access  Public
exports.handlePayFastCancel = async (req, res) => {
  try {
    const { m_payment_id } = req.query;
    
    // Get the order
    const order = await Order.findById(m_payment_id);
    if (!order) {
      console.error('Order not found:', m_payment_id);
      return res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=Order not found`);
    }

    // Log the cancel URL call
    console.log('PayFast cancel URL called:', {
      orderId: m_payment_id,
      orderStatus: order.isPaid ? 'Paid' : 'Pending'
    });
    
    // Redirect to frontend with cancelled status
    res.redirect(
      `${process.env.FRONTEND_URL}/payment/status?` +
      `orderId=${m_payment_id}&` +
      `status=CANCELLED&` +
      `isPaid=${order.isPaid}&` +
      `totalAmount=${order.totalPrice}`
    );
  } catch (error) {
    console.error('PayFast cancel error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=${error.message}`);
  }
};

// @desc    Generate test callback data
// @route   GET /api/v1/payments/payfast/test-data/:orderId
// @access  Private/Admin
exports.generateTestData = async (req, res) => {
  try {
    // Trim any whitespace or newlines from the orderId
    const orderId = req.params.orderId.trim();
    
    // Validate orderId format
    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order ID format'
      });
    }

    // Get the order to verify it exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Generate callback data using the actual order amount
    const testData = payfast.generateCallbackData(orderId, order.totalPrice.toFixed(2));
    
    res.status(200).json({
      success: true,
      data: testData
    });
  } catch (error) {
    console.error('Error generating test data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 