import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartAPI from '../../api/cartAPI';

const initialState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
  appliedOffers: [],
  discount: 0,
  total: 0,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartAPI.getCart();
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch cart');
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await cartAPI.addToCart(productId, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to add item to cart');
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await cartAPI.updateCartItem(productId, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update cart item');
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      return await cartAPI.removeFromCart(productId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to remove item from cart');
    }
  }
);

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartAPI.clearCart();
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    applyOffer: (state, action) => {
      if (!state.appliedOffers.find(offer => offer.id === action.payload.id)) {
        state.appliedOffers.push(action.payload);
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    removeOffer: (state, action) => {
      state.appliedOffers = state.appliedOffers.filter(offer => offer.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearError: (state) => {
      state.error = null;
    },
    calculateTotals: (state) => {
      // Calculate discount from applied offers
      state.discount = state.appliedOffers.reduce((totalDiscount, offer) => {
        if (offer.type === 'percentage') {
          return totalDiscount + (state.totalPrice * offer.value / 100);
        } else if (offer.type === 'fixed') {
          return totalDiscount + offer.value;
        }
        return totalDiscount;
      }, 0);
      
      state.total = Math.max(0, state.totalPrice - state.discount);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.totalPrice = action.payload.totalPrice || 0;
        } else {
          state.items = [];
          state.totalPrice = 0;
        }
        cartSlice.caseReducers.calculateTotals(state);
        console.log('fetchCart.fulfilled payload:', action.payload, 'state.items:', state.items);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cart';
      })
      // Add to cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.totalPrice = action.payload.totalPrice || 0;
        } else {
          state.items = [];
          state.totalPrice = 0;
        }
        cartSlice.caseReducers.calculateTotals(state);
        console.log('addItemToCart.fulfilled payload:', action.payload, 'state.items:', state.items);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add item to cart';
      })
      // Update cart item
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.totalPrice = action.payload.totalPrice || 0;
        } else {
          state.items = [];
          state.totalPrice = 0;
        }
        cartSlice.caseReducers.calculateTotals(state);
        console.log('updateCartItemQuantity.fulfilled payload:', action.payload, 'state.items:', state.items);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update cart item';
      })
      // Remove from cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.totalPrice = action.payload.totalPrice || 0;
        } else {
          state.items = [];
          state.totalPrice = 0;
        }
        cartSlice.caseReducers.calculateTotals(state);
        console.log('removeItemFromCart.fulfilled payload:', action.payload, 'state.items:', state.items);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove item from cart';
      })
      // Clear cart
      .addCase(clearUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.totalPrice = action.payload.totalPrice || 0;
        } else {
          state.items = [];
          state.totalPrice = 0;
        }
        cartSlice.caseReducers.calculateTotals(state);
        console.log('clearUserCart.fulfilled payload:', action.payload, 'state.items:', state.items);
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to clear cart';
      });
  },
});

export const {
  applyOffer,
  removeOffer,
  clearError,
  calculateTotals
} = cartSlice.actions;

export default cartSlice.reducer;