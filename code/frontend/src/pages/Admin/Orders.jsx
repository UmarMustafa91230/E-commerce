import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Visibility,
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel,
  FilterList,
  Refresh,
  TrendingUp,
  ShoppingCart,
  Payment,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import {
  getAllOrders,
  getOrderStats,
  updateOrderStatus,
  clearError,
} from '../../redux/slices/orderSlice';
import { formatCurrency } from '../../utils/formatters';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, stats, loading, error, pagination } = useSelector(state => state.orders);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [statusDialog, setStatusDialog] = useState({ open: false, order: null, newStatus: '' });

  useEffect(() => {
    loadOrders();
    loadStats();
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const loadOrders = () => {
    const params = { page };
    if (statusFilter) params.status = statusFilter;
    dispatch(getAllOrders(params));
  };

  const loadStats = () => {
    dispatch(getOrderStats());
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handleStatusUpdate = async () => {
    try {
      await dispatch(updateOrderStatus({
        orderId: statusDialog.order._id,
        status: statusDialog.newStatus
      })).unwrap();
      toast.success('Order status updated successfully');
      setStatusDialog({ open: false, order: null, newStatus: '' });
      loadOrders();
      loadStats();
    } catch (error) {
      toast.error(error);
    }
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusOptions = (order) => {
    const options = [];
    if (!order.isPaid) options.push({ value: 'paid', label: 'Mark as Paid' });
    if (order.isPaid && !order.isDelivered) options.push({ value: 'delivered', label: 'Mark as Delivered' });
    if (!order.isDelivered) options.push({ value: 'cancelled', label: 'Cancel Order' });
    return options;
  };

  if (loading && orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading orders...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track all customer orders
        </Typography>
      </Box>

      {/* Statistics Cards */}
      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" color="primary">
                      {stats.totalOrders}
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
                      {stats.paidOrders}
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
                      {stats.deliveredOrders}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Delivered Orders
                    </Typography>
                  </Box>
                  <ShippingIcon color="info" sx={{ fontSize: 40 }} />
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
                      {formatCurrency(stats.totalRevenue)}
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

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Orders</MenuItem>
          <MenuItem value="unpaid">Pending Payment</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
        </TextField>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={loadOrders}
        >
          Refresh
        </Button>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper}>
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
            {orders.map((order) => (
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
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Status">
                      <IconButton
                        size="small"
                        onClick={() => setStatusDialog({
                          open: true,
                          order,
                          newStatus: ''
                        })}
                      >
                        <FilterList />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pagination.pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Status Update Dialog */}
      <Dialog
        open={statusDialog.open}
        onClose={() => setStatusDialog({ open: false, order: null, newStatus: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Order #{statusDialog.order?._id?.slice(-8).toUpperCase()}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select
              value={statusDialog.newStatus}
              onChange={(e) => setStatusDialog(prev => ({ ...prev, newStatus: e.target.value }))}
              label="New Status"
            >
              {statusDialog.order && getStatusOptions(statusDialog.order).map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setStatusDialog({ open: false, order: null, newStatus: '' })}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={!statusDialog.newStatus}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminOrders; 