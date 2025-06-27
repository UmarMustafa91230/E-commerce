import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Alert, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './redux/store';
import theme from './theme/muiTheme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import { checkAuthStatus } from './redux/slices/authSlice';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const VerifyOTP = lazy(() => import('./pages/Auth/VerifyOTP'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Orders = lazy(() => import('./pages/Profile/Orders'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/Products'));
const AdminOrders = lazy(() => import('./pages/Admin/Orders'));
const CreateProduct = lazy(() => import('./pages/Admin/CreateProduct'));
const EditProduct = lazy(() => import('./pages/Admin/EditProduct'));
const UserDashboard = lazy(() => import('./pages/User/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ShippingInfo = lazy(() => import('./pages/ShippingInfo'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// App Content Component
const AppContent = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    // Check authentication status when app loads
    const initAuth = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        // Don't show error for auth check failure, just continue
      }
    };
    
    initAuth();
  }, [dispatch]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <LoadingSpinner message="Initializing..." />
      </Box>
    );
  }

  return (
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Protected Routes */}
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
              <Route path="/orders/:id" element={
                <ProtectedRoute>
                  <OrderDetail />
                    </ProtectedRoute>
                  } />
                  
                  {/* Dashboard Routes */}
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/shipping" element={<ShippingInfo />} />
                  <Route path="/terms" element={<TermsOfService />} />
              
              {/* Admin Routes */}
              <Route path="/admin/products" element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              } />
              <Route path="/admin/products/create" element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              } />
              <Route path="/admin/products/edit/:id" element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              } />
              <Route path="/admin/orders" element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              } />
              <Route path="/admin/orders/:id" element={
                <AdminRoute>
                  <OrderDetail />
                </AdminRoute>
              } />
                </Routes>
              </Suspense>
            </Box>
            <Footer />
          </Box>
          
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;