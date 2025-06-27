import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
import { Security, ArrowBack } from '@mui/icons-material';
import { verifyOtp } from '../../api/authAPI';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  
  const email = location.state?.email;

  // Redirect if no email
  React.useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await verifyOtp(email, values.otp);
      setIsVerified(true);
      toast.success('OTP verified successfully!');
      
      // Navigate to reset password page
      setTimeout(() => {
        navigate('/reset-password', { 
          state: { 
            email, 
            otp: values.otp 
          } 
        });
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.error || 'Invalid OTP');
      toast.error(error.response?.data?.error || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const otpSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
  });

  if (!email) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Verify OTP
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter the 6-digit code sent to {email}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isVerified && (
          <Alert severity="success" sx={{ mb: 3 }}>
            OTP verified successfully! Redirecting to reset password...
          </Alert>
        )}

        <Formik
          initialValues={{ otp: '' }}
          validationSchema={otpSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <TextField
                fullWidth
                label="Enter OTP"
                name="otp"
                type="text"
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.otp && Boolean(errors.otp)}
                helperText={touched.otp && errors.otp}
                margin="normal"
                placeholder="123456"
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*',
                }}
                InputProps={{
                  startAdornment: <Security sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || isLoading || isVerified}
                sx={{ mt: 3, mb: 3 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Verify OTP'
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Didn't receive the code?{' '}
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography component="span" color="primary" fontWeight={500}>
                      Resend OTP
                    </Typography>
                  </Link>
                </Typography>
                
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

export default VerifyOTP; 