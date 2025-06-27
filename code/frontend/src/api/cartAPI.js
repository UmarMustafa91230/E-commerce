import axiosClient from './axiosClient';

// Get user cart
export const getCart = async () => {
  try {
    const response = await axiosClient.get('/cart');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await axiosClient.post('/cart', { productId, quantity });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await axiosClient.put(`/cart/${productId}`, { quantity });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await axiosClient.delete(`/cart/${productId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Clear cart
export const clearCart = async () => {
  try {
    const response = await axiosClient.delete('/cart');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const syncCart = async (cartItems) => {
  return await axiosClient.post('/cart/sync', { items: cartItems });
};