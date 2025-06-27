// Mock Stripe payment simulation
class Stripe {
  constructor() {
    this.paymentIntents = new Map();
  }

  // Create a payment intent
  async createPaymentIntent(amount, currency = 'usd') {
    const paymentIntent = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
      created: Date.now()
    };

    this.paymentIntents.set(paymentIntent.id, paymentIntent);
    return paymentIntent;
  }

  // Confirm a payment intent
  async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
    const paymentIntent = this.paymentIntents.get(paymentIntentId);

    if (!paymentIntent) {
      throw new Error('Payment intent not found');
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Randomly succeed or fail (80% success rate)
    const success = Math.random() < 0.8;

    if (success) {
      paymentIntent.status = 'succeeded';
      paymentIntent.payment_method = paymentMethodId;
      paymentIntent.confirmed_at = Date.now();
    } else {
      paymentIntent.status = 'failed';
      paymentIntent.last_payment_error = {
        code: 'card_declined',
        message: 'Your card was declined'
      };
    }

    this.paymentIntents.set(paymentIntentId, paymentIntent);
    return paymentIntent;
  }

  // Retrieve a payment intent
  async retrievePaymentIntent(paymentIntentId) {
    const paymentIntent = this.paymentIntents.get(paymentIntentId);

    if (!paymentIntent) {
      throw new Error('Payment intent not found');
    }

    return paymentIntent;
  }

  // Create a refund
  async createRefund(paymentIntentId, amount) {
    const paymentIntent = this.paymentIntents.get(paymentIntentId);

    if (!paymentIntent) {
      throw new Error('Payment intent not found');
    }

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Cannot refund a payment that has not succeeded');
    }

    const refund = {
      id: `re_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: paymentIntent.currency,
      status: 'succeeded',
      payment_intent: paymentIntentId,
      created: Date.now()
    };

    return refund;
  }
}

// Create and export a singleton instance
const stripe = new Stripe();
module.exports = stripe; 