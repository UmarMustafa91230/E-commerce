import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
  });

  const handleUpdate = async (values) => {
    try {
      await dispatch(updateProfile(values)).unwrap();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
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
                    label="Shipping Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Paper>

            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Divider sx={{ my: 4 }} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          My Orders
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          View your full order history and download invoices.
        </Typography>
        <Link to="/orders">
          <Button variant="outlined">Go to Orders</Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default Profile;
