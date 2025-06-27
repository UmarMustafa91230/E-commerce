import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { login, clearError } from '../../redux/slices/authSlice';
import { loginSchema } from '../../utils/validators';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated, user } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  const from = location.state?.from?.pathname || '/';

  React.useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        // For regular users, redirect to products page or the intended destination
        const redirectPath = from === '/' ? '/products' : from;
        navigate(redirectPath, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      
      // Check the user role from the login response
      if (result.user && result.user.role === 'admin') {
        navigate('/admin', { replace: true });
        toast.success('Welcome to Admin Dashboard!');
      } else {
        // For regular users, redirect to products page or the intended destination
        const redirectPath = from === '/' ? '/products' : from;
        navigate(redirectPath, { replace: true });
      toast.success('Welcome back!');
      }
    } catch (error) {
      // Error is handled by the slice
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Sign in to your account to continue
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(0, 255, 255, 0.3)',
                      boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#00FFFF',
                      boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#00FFFF',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
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
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            color: '#00FFFF',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(0, 255, 255, 0.3)',
                      boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#00FFFF',
                      boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#00FFFF',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />

              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link
                  to="/forgot-password"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: '#00FFFF',
                      '&:hover': {
                        color: '#4DFFFF',
                        textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                      },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || isLoading}
                sx={{ 
                  mb: 3,
                  background: 'linear-gradient(135deg, #00FFFF 0%, #a020f0 100%)',
                  color: '#0e0e10',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4DFFFF 0%, #b44df0 100%)',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
                    transform: 'translateY(-2px) scale(1.02)',
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    boxShadow: 'none',
                  },
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Divider sx={{ mb: 3, '&::before, &::after': { borderColor: 'rgba(255, 255, 255, 0.2)' } }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>or</Typography>
              </Divider>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => toast.info('Google sign-in coming soon!')}
                  sx={{
                    border: '2px solid #00FFFF',
                    color: '#00FFFF',
                    background: 'rgba(0, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: 'rgba(0, 255, 255, 0.1)',
                      borderColor: '#4DFFFF',
                      color: '#4DFFFF',
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                    },
                  }}
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => toast.info('Facebook sign-in coming soon!')}
                  sx={{
                    border: '2px solid #a020f0',
                    color: '#a020f0',
                    background: 'rgba(160, 32, 240, 0.05)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: 'rgba(160, 32, 240, 0.1)',
                      borderColor: '#b44df0',
                      color: '#b44df0',
                      boxShadow: '0 0 20px rgba(160, 32, 240, 0.4)',
                    },
                  }}
                >
                  Facebook
                </Button>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography 
                      component="span" 
                      sx={{
                        color: '#00FFFF',
                        fontWeight: 600,
                        '&:hover': {
                          color: '#4DFFFF',
                          textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                        },
                      }}
                    >
                      Sign up
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

export default Login;