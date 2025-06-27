const crypto = require('crypto');

class PayFast {
  constructor() {
    this.merchantId = process.env.PAYFAST_MERCHANT_ID;
    this.merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    this.passPhrase = process.env.PAYFAST_PASSPHRASE;
    this.testMode = process.env.NODE_ENV !== 'production';
  }

  generatePaymentData(order, user) {
    const data = {
      merchant_id: this.merchantId,
      merchant_key: this.merchantKey,
      return_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      notify_url: `${process.env.BACKEND_URL}/api/v1/payments/payfast/notify`,
      name_first: user.name.split(' ')[0],
      name_last: user.name.split(' ').slice(1).join(' '),
      email_address: user.email,
      m_payment_id: order._id.toString(),
      amount: order.totalPrice.toFixed(2),
      item_name: `Order #${order._id}`,
      custom_str1: order._id.toString(),
      email_address: user.email,
      cell_number: user.phone || '',
      custom_str2: order.paymentMethod
    };

    // Generate signature
    const signature = this.generateSignature(data);
    data.signature = signature;

    return data;
  }

  generateSignature(data) {
    // Create parameter string
    let parameterString = '';
    Object.keys(data).sort().forEach(key => {
      if (data[key] !== '' && data[key] !== null) {
        parameterString += `${key}=${encodeURIComponent(data[key].trim())}&`;
      }
    });

    // Remove last &
    parameterString = parameterString.slice(0, -1);

    // Add passphrase if it exists
    if (this.passPhrase) {
      parameterString += `&passphrase=${encodeURIComponent(this.passPhrase.trim())}`;
    }

    // Generate MD5 hash
    return crypto.createHash('md5').update(parameterString).digest('hex');
  }

  validateCallback(data, signature) {
    // Create a copy of the data without the signature
    const dataForSignature = { ...data };
    delete dataForSignature.signature;

    // Generate signature from the data
    const calculatedSignature = this.generateSignature(dataForSignature);
    console.log('Data for signature:', dataForSignature);
    console.log('Calculated signature:', calculatedSignature);
    console.log('Received signature:', signature);

    return calculatedSignature === signature;
  }

  // Helper method to generate test data with valid signature
  generateTestCallbackData(orderId, amount = '100.00') {
    const data = {
      merchant_id: this.merchantId,
      merchant_key: this.merchantKey,
      return_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      notify_url: `${process.env.BACKEND_URL}/api/v1/payments/payfast/notify`,
      name_first: 'Test',
      name_last: 'User',
      email_address: 'test@example.com',
      m_payment_id: orderId,
      amount: amount,
      item_name: `Order #${orderId}`,
      payment_status: 'COMPLETE',
      pf_payment_id: `pf_${Math.random().toString(36).substr(2, 9)}`,
      amount_gross: amount,
      amount_fee: '3.50',
      amount_net: (parseFloat(amount) - 3.50).toFixed(2),
      custom_str1: orderId,
      custom_str2: 'PayFast'
    };

    // Generate signature
    const signature = this.generateSignature(data);
    data.signature = signature;

    return data;
  }

  // Helper method to generate callback data for testing
  generateCallbackData(orderId, amount = '100.00') {
    // Validate inputs
    if (!orderId || !amount) {
      throw new Error('Order ID and amount are required');
    }

    // Ensure amount is a valid number with 2 decimal places
    const formattedAmount = parseFloat(amount).toFixed(2);
    const amountGross = formattedAmount;
    const amountFee = '3.50';
    const amountNet = (parseFloat(formattedAmount) - parseFloat(amountFee)).toFixed(2);

    const data = {
      merchant_id: this.merchantId,
      merchant_key: this.merchantKey,
      return_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      notify_url: `${process.env.BACKEND_URL}/api/v1/payments/payfast/notify`,
      name_first: 'Test',
      name_last: 'User',
      email_address: 'test@example.com',
      m_payment_id: orderId,
      amount: formattedAmount,
      item_name: `Order #${orderId}`,
      payment_status: 'COMPLETE',
      pf_payment_id: `pf_${Math.random().toString(36).substr(2, 9)}`,
      amount_gross: amountGross,
      amount_fee: amountFee,
      amount_net: amountNet,
      custom_str1: orderId,
      custom_str2: 'PayFast'
    };

    // Generate signature
    const signature = this.generateSignature(data);
    data.signature = signature;

    return data;
  }
}

module.exports = new PayFast(); 