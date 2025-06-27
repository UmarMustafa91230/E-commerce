import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { sendOtp } from '../../api/authAPI';
import { forgotPasswordSchema } from '../../utils/validators';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await sendOtp(values.email);
      setSuccess(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send OTP');
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your email to receive a password reset code
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            OTP has been sent to your email. Please check your inbox and proceed to verify OTP.
          </Alert>
        )}

        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
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
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || isLoading}
                sx={{ mt: 3, mb: 3 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send OTP'
                )}
              </Button>

              {success && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link
                    to="/verify-otp"
                    state={{ email: values.email }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                    >
                      Verify OTP
                    </Button>
                  </Link>
                </Box>
              )}

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2">
                  Remember your password?{' '}
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

export default ForgotPassword; 