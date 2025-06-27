import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  ShoppingCart,
  Inventory,
  AttachMoney,
  TrendingUp,
  Add,
  Edit,
  Delete,
  Visibility,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
  LocalOffer,
  Payment,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getOrderStats, getAllOrders, clearError } from '../../redux/slices/orderSlice';
import { getProducts } from '../../redux/slices/productSlice';
import { formatCurrency } from '../../utils/formatters';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [addProductDialog, setAddProductDialog] = useState(false);
  const [addOfferDialog, setAddOfferDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });
  const [newOffer, setNewOffer] = useState({
    product: '',
    originalPrice: '',
    offerPrice: '',
    discount: '',
    startDate: '',
    endDate: '',
  });

  const { stats: orderStats, orders: recentOrders, loading: ordersLoading } = useSelector(state => state.orders);
  const { items: products, loading: productsLoading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getOrderStats());
    dispatch(getAllOrders({ page: 1, limit: 5 }));
    dispatch(getProducts({ limit: 5 }));
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.brand || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically dispatch an action to add the product
    console.log('Adding product:', newProduct);
    toast.success('Product added successfully!');
    setAddProductDialog(false);
    setNewProduct({
      name: '',
      brand: '',
      category: '',
      price: '',
      stock: '',
      description: '',
    });
  };

  const handleAddOffer = () => {
    // Validate form
    if (!newOffer.product || !newOffer.originalPrice || !newOffer.offerPrice || !newOffer.startDate || !newOffer.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically dispatch an action to add the offer
    console.log('Adding offer:', newOffer);
    toast.success('Offer added successfully!');
    setAddOfferDialog(false);
    setNewOffer({
      product: '',
      originalPrice: '',
      offerPrice: '',
      discount: '',
      startDate: '',
      endDate: '',
    });
  };

  const getStatusColor = (order) => {
    if (order.isDelivered) return 'success';
    if (order.isPaid) return 'info';
        return 'warning';
  };

  const getStatusIcon = (order) => {
    if (order.isDelivered) return <CheckCircle />;
    if (order.isPaid) return <LocalShipping />;
    return <Pending />;
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

  if (ordersLoading || productsLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your store.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      {orderStats && (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" color="primary">
                      {orderStats.totalOrders}
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" color="success.main">
                      {orderStats.paidOrders}
                  </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Paid Orders
                  </Typography>
                </Box>
                  <Payment color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" color="info.main">
                      {orderStats.deliveredOrders}
                  </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Delivered Orders
                  </Typography>
                </Box>
                  <LocalShipping color="info" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" color="warning.main">
                      {formatCurrency(orderStats.totalRevenue)}
                  </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue
                  </Typography>
                </Box>
                  <TrendingUp color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      )}

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Add />}
            onClick={() => navigate('/admin/products/create')}
            sx={{ py: 2 }}
          >
            Add Product
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={() => navigate('/admin/orders')}
            sx={{ py: 2 }}
          >
            Manage Orders
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Inventory />}
            onClick={() => navigate('/admin/products')}
            sx={{ py: 2 }}
          >
            Manage Products
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LocalOffer />}
            onClick={() => navigate('/admin/offers')}
            sx={{ py: 2 }}
          >
            Manage Offers
          </Button>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Recent Orders" />
          <Tab label="Recent Products" />
          <Tab label="Recent Offers" />
        </Tabs>

        {/* Recent Orders Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Orders</Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/orders')}
              startIcon={<Visibility />}
            >
              View All Orders
            </Button>
          </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        #{order._id.slice(-8).toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.user?.firstName} {order.user?.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.user?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
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
                          onClick={() => navigate(`/admin/orders/${order._id}`)}
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
          </Box>

        {/* Recent Products Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Products</Typography>
              <Button
              variant="outlined"
              onClick={() => navigate('/admin/products')}
              startIcon={<Inventory />}
            >
              View All Products
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>Product</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                      <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {product.name}
                      </Typography>
                      </TableCell>
                      <TableCell>
                      <Typography variant="body2">
                        {product.brand}
                      </Typography>
                      </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {product.category}
              </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {formatCurrency(product.price)}
                </Typography>
                    </TableCell>
                      <TableCell>
                        <Chip
                        label={product.stock}
                        color={product.stock > 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit Product">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

        {/* Recent Offers Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Offers</Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/offers')}
              startIcon={<LocalOffer />}
            >
              View All Offers
            </Button>
          </Box>
          <Alert severity="info">
            Offers management feature coming soon! You'll be able to create and manage promotional offers here.
          </Alert>
          </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 