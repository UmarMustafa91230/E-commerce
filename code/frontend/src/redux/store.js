import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';
import orderSlice from './slices/orderSlice';
import offerSlice from './slices/offerSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productSlice,
    orders: orderSlice,
    offers: offerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'products/getProducts/fulfilled',
          'products/getProductById/fulfilled',
          'products/addProduct/fulfilled',
          'products/editProduct/fulfilled',
          'auth/checkAuthStatus/fulfilled',
          'auth/login/fulfilled',
          'auth/register/fulfilled',
          'auth/updateProfile/fulfilled',
          'cart/fetchCart/fulfilled',
          'cart/addItemToCart/fulfilled',
          'cart/updateCartItemQuantity/fulfilled',
          'cart/removeItemFromCart/fulfilled',
          'cart/clearUserCart/fulfilled',
          'orders/getMyOrders/fulfilled',
          'orders/getOrderById/fulfilled',
          'orders/createOrder/fulfilled',
          'orders/updateOrderStatus/fulfilled',
        ],
        ignoredPaths: ['payload.headers', 'payload.config'],
      },
    }),
});

export default store;