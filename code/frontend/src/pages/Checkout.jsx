import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from '../utils/formatters';
import { createOrder } from '../redux/slices/orderSlice';
import { clearUserCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, discount, total } = useSelector(state => state.cart);
  const shipping = 10; // Flat shipping for now
  const navigate = useNavigate();
  const initialValues = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cash',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
    paymentMethod: Yup.string().required('Please select a payment method'),
  });

  const handlePlaceOrder = async (values) => {
    try {
      const orderData = {
        shippingAddress: {
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
        paymentMethod: values.paymentMethod,
      };
      await dispatch(createOrder(orderData)).unwrap();
      await dispatch(clearUserCart());
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error || 'Failed to place order');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handlePlaceOrder}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="fullName"
                    label="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="city"
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="postalCode"
                    label="Postal Code"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postalCode && Boolean(errors.postalCode)}
                    helperText={touched.postalCode && errors.postalCode}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="country"
                    label="Country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <FormLabel component="legend">Select a method</FormLabel>
              <RadioGroup
                name="paymentMethod"
                value={values.paymentMethod}
                onChange={handleChange}
              >
                <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="payfast" control={<Radio />} label="PayFast" />
              </RadioGroup>
              {touched.paymentMethod && errors.paymentMethod && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.paymentMethod}
                </Typography>
              )}
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Items Total</Typography>
                <Typography>{formatCurrency(totalPrice)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>{formatCurrency(shipping)}</Typography>
              </Box>
              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="success.main">Discount:</Typography>
                  <Typography color="success.main">-{formatCurrency(discount)}</Typography>
                </Box>
              )}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <Typography>Total</Typography>
                <Typography>{formatCurrency((total || totalPrice) + shipping)}</Typography>
              </Box>
            </Paper>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Place Order
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Checkout;
