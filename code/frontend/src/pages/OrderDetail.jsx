import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack,
  LocalShipping,
  CheckCircle,
  Schedule,
  Payment,
  LocationOn,
  Receipt,
  Update,
} from '@mui/icons-material';
import {
  getOrderById,
  updateOrderStatus,
  clearError,
} from '../redux/slices/orderSlice';
import { formatCurrency } from '../utils/formatters';
import { toast } from 'react-toastify';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedOrder, loading, error } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);
  const [statusDialog, setStatusDialog] = useState({ open: false, newStatus: '' });

  useEffect(() => {
    dispatch(getOrderById(id));
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleStatusUpdate = async () => {
    try {
      await dispatch(updateOrderStatus({
        orderId: selectedOrder._id,
        status: statusDialog.newStatus
      })).unwrap();
      toast.success('Order status updated successfully');
      setStatusDialog({ open: false, newStatus: '' });
      dispatch(getOrderById(id));
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
      month: 'long',
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading order details...
        </Typography>
      </Container>
    );
  }

  if (!selectedOrder) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Order not found or you don't have permission to view this order.
        </Alert>
      </Container>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Box>
          <Typography variant="h4" gutterBottom>
            Order #{selectedOrder._id.slice(-8).toUpperCase()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Placed on {formatDate(selectedOrder.createdAt)}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Order Status */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Order Status</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={getStatusIcon(selectedOrder)}
                    label={getStatusText(selectedOrder)}
                    color={getStatusColor(selectedOrder)}
                    size="large"
                  />
                  {isAdmin && (
                    <Button
                      variant="outlined"
                      startIcon={<Update />}
                      onClick={() => setStatusDialog({ open: true, newStatus: '' })}
                    >
                      Update Status
                    </Button>
                  )}
                </Box>
              </Box>

              {/* Order Items */}
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
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
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {item.name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatCurrency(item.price)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={500}>
                            {formatCurrency(item.price * item.quantity)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Order Summary */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">{formatCurrency(selectedOrder.totalPrice)}</Typography>
                </Box>
                {selectedOrder.appliedOffer && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="success.main">
                      Discount ({selectedOrder.appliedOffer.name}):
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      -{formatCurrency(selectedOrder.appliedOffer.discountAmount || 0)}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(selectedOrder.totalPrice)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Details Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Customer Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body1">
                      {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {selectedOrder.user?.email}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Shipping Address */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Shipping Address
                  </Typography>
                  <Typography variant="body2">
                    {selectedOrder.shippingAddress?.address}
                  </Typography>
                  <Typography variant="body2">
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                  </Typography>
                  <Typography variant="body2">
                    {selectedOrder.shippingAddress?.country}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Payment Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Payment sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Payment Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Method
                    </Typography>
                    <Typography variant="body1">
                      {selectedOrder.paymentMethod}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Status
                    </Typography>
                    <Chip
                      label={selectedOrder.isPaid ? 'Paid' : 'Pending'}
                      color={selectedOrder.isPaid ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  {selectedOrder.isPaid && selectedOrder.paidAt && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Paid On
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(selectedOrder.paidAt)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Delivery Information */}
            {selectedOrder.isDelivered && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Delivery Information
                    </Typography>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Delivered On
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(selectedOrder.deliveredAt)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Status Update Dialog */}
      <Dialog
        open={statusDialog.open}
        onClose={() => setStatusDialog({ open: false, newStatus: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Order #{selectedOrder._id?.slice(-8).toUpperCase()}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select
              value={statusDialog.newStatus}
              onChange={(e) => setStatusDialog(prev => ({ ...prev, newStatus: e.target.value }))}
              label="New Status"
            >
              {getStatusOptions(selectedOrder).map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setStatusDialog({ open: false, newStatus: '' })}
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

export default OrderDetail; 