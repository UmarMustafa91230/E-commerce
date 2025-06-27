import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import { register, clearError } from '../../redux/slices/authSlice';
import { registerSchema } from '../../utils/validators';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        // For regular users, redirect to products page
        navigate('/products', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(register(values)).unwrap();
      
      // Check the user role from the registration response
      if (result.user && result.user.role === 'admin') {
        navigate('/admin', { replace: true });
        toast.success('Welcome to Admin Dashboard!');
      } else {
        // For regular users, redirect to products page
        navigate('/products', { replace: true });
        toast.success('Account created successfully! Welcome to our store!');
      }
    } catch (error) {
      // Error handled in slice
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join us and start shopping in style
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                margin="normal"
                autoComplete="name"
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || isLoading}
                sx={{ mt: 2, mb: 3 }}
              >
                {isLoading ? 'Registering...' : 'Sign Up'}
              </Button>

              <Divider sx={{ mb: 3 }}>or</Divider>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => toast.info('Google sign-up coming soon!')}
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => toast.info('Facebook sign-up coming soon!')}
                >
                  Facebook
                </Button>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography component="span" color="primary" fontWeight={500}>
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;
