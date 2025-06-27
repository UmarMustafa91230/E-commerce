import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, ArrowBack } from '@mui/icons-material';
import { resetPassword } from '../../api/authAPI';
import { resetPasswordSchema } from '../../utils/validators';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { email, otp } = location.state || {};

  // Redirect if no email or OTP
  React.useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await resetPassword(email, otp, values.password);
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      
      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to reset password');
      toast.error(error.response?.data?.error || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !otp) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your new password for {email}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Password reset successfully! Redirecting to login...
          </Alert>
        )}

        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <TextField
                fullWidth
                label="New Password"
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
                  startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
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

              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                margin="normal"
                autoComplete="new-password"
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                disabled={isSubmitting || isLoading || isSuccess}
                sx={{ mt: 3, mb: 3 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Reset Password'
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Button
                    startIcon={<ArrowBack />}
                    variant="text"
                    size="small"
                  >
                    Back to Login
                  </Button>
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ResetPassword; 