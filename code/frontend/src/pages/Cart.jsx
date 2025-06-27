import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  TextField,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCartOutlined,
  ArrowBack,
} from '@mui/icons-material';
import {
  fetchCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearUserCart,
  clearError,
} from '../redux/slices/cartSlice';
import { formatCurrency } from '../utils/formatters';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, discount, total, loading, error } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(productId);
    } else {
      try {
        await dispatch(updateCartItemQuantity({ productId, quantity: newQuantity })).unwrap();
        toast.success('Quantity updated');
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeItemFromCart(productId)).unwrap();
    toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearUserCart()).unwrap();
    toast.success('Cart cleared');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartOutlined sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Please log in to view your cart
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You need to be logged in to access your shopping cart.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/login"
        >
          Login
        </Button>
      </Container>
    );
  }

  if (loading && items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your cart...
        </Typography>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartOutlined sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything to your cart yet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review your items and proceed to checkout
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Cart Items ({items.length})
            </Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleClearCart}
              disabled={loading}
            >
              Clear Cart
            </Button>
          </Box>

          {items.map((item) => (
            <Card key={item.product} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={item.image}
                      alt={item.name}
                      sx={{ borderRadius: 1, objectFit: 'cover' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(item.price)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                        size="small"
                        disabled={loading}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value) || 0;
                          handleQuantityChange(item.product, qty);
                        }}
                        inputProps={{
                          style: { textAlign: 'center', width: 60 },
                          min: 1,
                        }}
                        variant="outlined"
                        size="small"
                        sx={{ mx: 1 }}
                        disabled={loading}
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                        size="small"
                        disabled={loading}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                    <IconButton
                      onClick={() => handleRemoveItem(item.product)}
                      color="error"
                      disabled={loading}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              component={Link}
              to="/products"
            >
              Continue Shopping
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>{formatCurrency(totalPrice)}</Typography>
              </Box>
              
              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="success.main">Discount:</Typography>
                  <Typography color="success.main">-{formatCurrency(discount)}</Typography>
                </Box>
              )}
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  {formatCurrency(total)}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
            >
              {loading ? <CircularProgress size={24} /> : 'Proceed to Checkout'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;