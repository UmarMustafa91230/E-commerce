import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Send,
  WhatsApp,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  });

  const contactInfo = [
    {
      title: 'Visit Our Showroom',
      details: [
        '123 Luxury Avenue, Downtown',
        'New York, NY 10001',
        'United States'
      ],
      icon: <LocationOn />,
      color: '#1976d2'
    },
    {
      title: 'Call Us',
      details: [
        '+1 (555) 123-4567',
        '+1 (555) 987-6543',
        'Mon-Fri: 9AM-6PM EST'
      ],
      icon: <Phone />,
      color: '#2e7d32'
    },
    {
      title: 'Email Us',
      details: [
        'brandrkhanoffical@gmail.com',
        'brandrkhanoffical@gmail.com',
        'brandrkhanoffical@gmail.com'
      ],
      icon: <Email />,
      color: '#ed6c02'
    },
    {
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed'
      ],
      icon: <AccessTime />,
      color: '#9c27b0'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook />, url: '#', color: '#1877f2' },
    { name: 'Instagram', icon: <Instagram />, url: '#', color: '#e4405f' },
    { name: 'LinkedIn', icon: <LinkedIn />, url: '#', color: '#0077b5' },
    { name: 'Twitter', icon: <Twitter />, url: '#', color: '#1da1f2' },
    { name: 'WhatsApp', icon: <WhatsApp />, url: '#', color: '#25d366' },
  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        severity: 'success'
      });
      
      resetForm();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again.',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #0e0e10 0%, #1a1a1a 100%)', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 700,
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
              animation: 'glow 2s ease-in-out infinite alternate',
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Get in touch with our luxury watch experts. We're here to help you find your perfect timepiece.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Box sx={{ color: info.color, mb: 2 }}>
                  {info.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {info.title}
                </Typography>
                {info.details.map((detail, detailIndex) => (
                  <Typography key={detailIndex} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {detail}
                  </Typography>
                ))}
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 600, mb: 3, fontFamily: 'Rajdhani, sans-serif', textShadow: '0 0 15px rgba(0, 255, 255, 0.4)' }}>
                Send Us a Message
              </Typography>
              
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  subject: '',
                  message: ''
                }}
                validationSchema={contactSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={3}>
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
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.subject && Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={6}
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          startIcon={<Send />}
                          sx={{ mt: 2 }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>

          {/* Map and Social Links */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Map */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Visit Our Showroom
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Interactive Map Coming Soon
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  123 Luxury Avenue, Downtown<br />
                  New York, NY 10001<br />
                  United States
                </Typography>
              </Card>

              {/* Social Links */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Follow Us
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Stay updated with our latest collections and exclusive offers.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      size="small"
                      startIcon={social.icon}
                      sx={{ 
                        borderColor: social.color, 
                        color: social.color,
                        '&:hover': {
                          borderColor: social.color,
                          backgroundColor: `${social.color}10`
                        }
                      }}
                    >
                      {social.name}
                    </Button>
                  ))}
                </Box>
              </Card>

              {/* Quick Contact */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Need Immediate Assistance?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  For urgent inquiries or immediate support, please call us directly.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Phone />}
                  sx={{ mb: 1 }}
                >
                  Call Now: +1 (555) 123-4567
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<WhatsApp />}
                >
                  WhatsApp Support
                </Button>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600, mb: 4, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  How can I verify the authenticity of a watch?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All our watches come with certificates of authenticity and serial numbers. We also provide detailed documentation and can arrange for professional authentication services.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  What is your return policy?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We offer a 30-day return policy for all purchases. Watches must be in original condition with all packaging and documentation included.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Do you offer international shipping?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Yes, we ship to over 50 countries worldwide with secure, insured delivery and real-time tracking for your peace of mind.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Can I schedule a private consultation?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Absolutely! We offer private consultations by appointment. Contact us to schedule a personalized session with our watch experts.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar for form submission */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact; 