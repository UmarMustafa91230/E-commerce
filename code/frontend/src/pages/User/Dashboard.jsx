import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tabs,
  Tab,
  Badge,
  IconButton,
  CircularProgress,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart,
  Favorite,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
  Visibility,
  Star,
  Watch,
  Person,
  Settings,
  History,
} from '@mui/icons-material';
import { getMyOrders, clearError } from '../../redux/slices/orderSlice';
import { formatCurrency } from '../../utils/formatters';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { user, isLoading: authLoading } = useSelector(state => state.auth);
  const { orders, loading: ordersLoading, error } = useSelector(state => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders({ page: 1, limit: 5 }));
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (order) => {
    if (order.isDelivered) return 'success';
    if (order.isPaid) return 'info';
        return 'warning';
  };

  const getStatusIcon = (order) => {
    if (order.isDelivered) return <CheckCircle fontSize="small" />;
    if (order.isPaid) return <LocalShipping fontSize="small" />;
        return <Pending fontSize="small" />;
  };

  const getStatusText = (order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid) return 'Processing';
    return 'Pending Payment';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateTotalSpent = () => {
    return orders.reduce((total, order) => {
      if (order.isPaid) {
        return total + order.totalPrice;
      }
      return total;
    }, 0);
  };

  // Show loading if auth is still loading or orders are loading
  if (authLoading || (ordersLoading && orders.length === 0)) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your dashboard...
        </Typography>
      </Container>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          You need to be logged in to view your dashboard.
        </Alert>
        <Button
          variant="contained"
          component={Link}
          to="/login"
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
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DashboardIcon color="primary" />
          My Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.firstName} {user?.lastName}! Here's your account overview.
        </Typography>
      </Box>

      {/* User Profile Card */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 80, height: 80 }}
                >
                  {user?.firstName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Total Orders:</Typography>
                <Typography variant="h6">{orders.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Total Spent:</Typography>
                <Typography variant="h6">{formatCurrency(calculateTotalSpent())}</Typography>
              </Box>
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/profile"
                startIcon={<Settings />}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" color="primary">
                        {orders.length}
                  </Typography>
                      <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                    </Box>
                    <ShoppingCart color="primary" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" color="success.main">
                        {orders.filter(order => order.isDelivered).length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Delivered Orders
                      </Typography>
                    </Box>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" color="info.main">
                        {orders.filter(order => order.isPaid && !order.isDelivered).length}
                  </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Processing Orders
                  </Typography>
                    </Box>
                    <LocalShipping color="info" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" color="warning.main">
                        {orders.filter(order => !order.isPaid).length}
                  </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending Orders
                  </Typography>
                    </Box>
                    <Pending color="warning" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/products"
            startIcon={<Watch />}
            sx={{ py: 2 }}
          >
            Shop Now
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/orders"
            startIcon={<History />}
            sx={{ py: 2 }}
          >
            View Orders
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/cart"
            startIcon={<ShoppingCart />}
            sx={{ py: 2 }}
          >
            My Cart
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/profile"
            startIcon={<Person />}
            sx={{ py: 2 }}
          >
            My Profile
          </Button>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Recent Orders" />
          <Tab label="Wishlist" />
          <Tab label="Reviews" />
        </Tabs>

        {/* Recent Orders Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Orders</Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/orders"
              startIcon={<Visibility />}
            >
              View All Orders
            </Button>
          </Box>
          {orders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No orders yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start shopping to see your orders here.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/products"
              >
                Start Shopping
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          #{order._id.slice(-8).toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.items[0]?.name}
                          {order.items.length > 1 && ` +${order.items.length - 1} more`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {formatCurrency(order.totalPrice)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(order)}
                          label={getStatusText(order)}
                          color={getStatusColor(order)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(order.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            component={Link}
                            to={`/orders/${order._id}`}
                          >
                          <Visibility />
                        </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
                        </Box>

        {/* Wishlist Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">My Wishlist</Typography>
          </Box>
          <Alert severity="info">
            Wishlist feature coming soon! You'll be able to save your favorite products here.
          </Alert>
                          </Box>

        {/* Reviews Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">My Reviews</Typography>
          </Box>
          <Alert severity="info">
            Reviews feature coming soon! You'll be able to see and manage your product reviews here.
          </Alert>
          </Box>
        </Paper>
    </Container>
  );
};

export default UserDashboard; 