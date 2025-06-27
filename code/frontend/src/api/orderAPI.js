import axiosClient from './axiosClient';

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await axiosClient.post('/orders', orderData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.status) queryParams.append('status', params.status);
    
    const response = await axiosClient.get(`/orders?${queryParams.toString()}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axiosClient.get(`/orders/${orderId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Get user's orders
export const getMyOrders = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    
    const response = await axiosClient.get(`/orders/myorders?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update order to paid
export const updateOrderToPaid = async (orderId, paymentData) => {
  try {
    const response = await axiosClient.put(`/orders/${orderId}/pay`, paymentData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update order to delivered (Admin only)
export const updateOrderToDelivered = async (orderId) => {
  try {
    const response = await axiosClient.put(`/orders/${orderId}/deliver`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axiosClient.put(`/orders/${orderId}/status`, { status });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get order statistics (Admin only)
export const getOrderStats = async () => {
  try {
    const response = await axiosClient.get('/orders/stats');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrderStatus = async (orderId) => {
  return await axiosClient.get(`/orders/${orderId}/status`);
};

export const getUserOrders = async () => {
  // Mock user orders
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      orderNumber: 'WH1234567890',
      status: 'delivered',
      total: 5200,
      createdAt: '2024-01-15T10:30:00Z',
      items: [
        {
          id: 2,
          name: 'Omega Speedmaster',
          price: 5200,
          quantity: 1,
          image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'
        }
      ]
    },
    {
      id: 2,
      orderNumber: 'WH1234567891',
      status: 'processing',
      total: 450,
      createdAt: '2024-01-20T14:20:00Z',
      items: [
        {
          id: 4,
          name: 'Seiko Prospex',
          price: 450,
          quantity: 1,
          image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg'
        }
      ]
    }
  ];
};

export const cancelOrder = async (orderId) => {
  return await axiosClient.post(`/orders/${orderId}/cancel`);
};

export const getOrderInvoice = async (orderId) => {
  return await axiosClient.get(`/orders/${orderId}/invoice`, {
    responseType: 'blob'
  });
};