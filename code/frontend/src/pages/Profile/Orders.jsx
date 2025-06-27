import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Pagination,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Visibility,
  ShoppingBag,
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel,
  Person,
} from '@mui/icons-material';
import { getMyOrders, clearError } from '../../redux/slices/orderSlice';
import { formatCurrency } from '../../utils/formatters';
import { toast } from 'react-toastify';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders: ordersRaw, loading, error, pagination } = useSelector(state => state.orders);
  const { user, isLoading: authLoading } = useSelector(state => state.auth);
  const [page, setPage] = useState(1);
  let orders = ordersRaw;
  if (!Array.isArray(orders)) orders = [];
  let safePagination = pagination;
  if (!pagination || typeof pagination !== 'object') {
    safePagination = { page: 1, pages: 0, total: 0 };
  }
  console.log('orders:', orders, 'pagination:', safePagination, 'error:', error, 'loading:', loading);

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders({ page }));
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, page, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getStatusColor = (order) => {
    if (order.isDelivered) return 'success';
    if (order.isPaid) return 'info';
    return 'warning';
  };

  const getStatusIcon = (order) => {
    if (order.isDelivered) return <CheckCircle />;
    if (order.isPaid) return <LocalShipping />;
    return <Schedule />;
  };

  const getStatusText = (order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid) return 'Processing';
    return 'Pending Payment';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show loading if auth is still loading or orders are loading
  if (authLoading || (loading && orders.length === 0)) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your orders...
        </Typography>
      </Container>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          You need to be logged in to view your orders.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          startIcon={<Person />}
        >
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your order history and current orders
        </Typography>
      </Box>

        {orders.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No orders yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Grid container spacing={3}>
              {orders.map((order) => (
              <Grid item xs={12} key={order._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Order #{order._id.slice(-8).toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Placed on {formatDate(order.createdAt)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          icon={getStatusIcon(order)}
                          label={getStatusText(order)}
                          color={getStatusColor(order)}
                          variant="outlined"
                        />
                        <Tooltip title="View Order Details">
                          <IconButton
                            onClick={() => navigate(`/orders/${order._id}`)}
                            size="small"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      {order.items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{
                                width: 60,
                                height: 60,
                                objectFit: 'cover',
                                borderRadius: 1,
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight={500} noWrap>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Qty: {item.quantity}
                              </Typography>
                              <Typography variant="body2" color="primary">
                                {formatCurrency(item.price)}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" color="primary">
                          Total: {formatCurrency(order.totalPrice)}
                        </Typography>
                        {order.appliedOffer && (
                          <Typography variant="body2" color="success.main">
                            Offer applied: {order.appliedOffer.name}
                          </Typography>
                        )}
                      </Box>
                    <Button
                      variant="outlined"
                        onClick={() => navigate(`/orders/${order._id}`)}
                        startIcon={<Visibility />}
                    >
                        View Details
                    </Button>
                    </Box>

                    {order.shippingAddress && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body2" fontWeight={500} gutterBottom>
                          Shipping Address:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {safePagination.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={safePagination.pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Orders;
