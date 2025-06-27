import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderAPI from '../../api/orderAPI';

// Create new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderAPI.createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create order');
    }
  }
);

// Get all orders (Admin only)
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getAllOrders(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch orders');
    }
  }
);

// Get order by ID
export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrderById(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch order');
    }
  }
);

// Get user's orders
export const getMyOrders = createAsyncThunk(
  'orders/getMyOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getMyOrders(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch orders');
    }
  }
);

// Update order to paid
export const updateOrderToPaid = createAsyncThunk(
  'orders/updateOrderToPaid',
  async ({ orderId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await orderAPI.updateOrderToPaid(orderId, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update order payment');
    }
  }
);

// Update order to delivered (Admin only)
export const updateOrderToDelivered = createAsyncThunk(
  'orders/updateOrderToDelivered',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderAPI.updateOrderToDelivered(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update order delivery');
    }
  }
);

// Update order status (Admin only)
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await orderAPI.updateOrderStatus(orderId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update order status');
    }
  }
);

// Get order statistics (Admin only)
export const getOrderStats = createAsyncThunk(
  'orders/getOrderStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrderStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch order statistics');
    }
  }
);

const initialState = {
  orders: [],
  selectedOrder: null,
  stats: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 0,
    total: 0,
  },
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.pagination = {
        page: 1,
        pages: 0,
        total: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Orders (Admin)
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload.data) ? action.payload.data : [];
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload.data) ? action.payload.data : [];
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order To Paid
      .addCase(updateOrderToPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderToPaid.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder && state.selectedOrder._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrderToPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order To Delivered
      .addCase(updateOrderToDelivered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder && state.selectedOrder._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrderToDelivered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder && state.selectedOrder._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order Stats
      .addCase(getOrderStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedOrder, clearError, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;