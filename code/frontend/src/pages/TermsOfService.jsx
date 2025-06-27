import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Gavel,
  Policy,
  ShoppingCart,
  Security,
  Info,
  Warning,
  Update,
  Copyright,
  VerifiedUser,
  LocalShipping,
} from '@mui/icons-material';

const TermsOfService = () => {
  const lastUpdated = 'January 15, 2024';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <VerifiedUser />,
      content: [
        'By accessing or using the Brands-R-khan website, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        'If you do not agree with any part of these terms, you may not use our website or services.'
      ]
    },
    {
      title: 'Account Registration',
      icon: <Policy />,
      content: [
        'You must be at least 18 years old to create an account or make a purchase.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate and complete information during registration and to update your information as needed.'
      ]
    },
    {
      title: 'Purchases & Payments',
      icon: <ShoppingCart />,
      content: [
        'All prices are listed in USD and are subject to change without notice.',
        'Payment must be made in full before orders are processed and shipped.',
        'We accept major credit cards, PayPal, and other secure payment methods.',
        'Orders may be canceled or refused at our discretion.'
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: <LocalShipping />,
      content: [
        'Shipping times and costs are provided at checkout and may vary by location.',
        'We are not responsible for delays caused by carriers, customs, or force majeure events.',
        'Risk of loss and title for products pass to you upon delivery.'
      ]
    },
    {
      title: 'Returns & Refunds',
      icon: <Gavel />,
      content: [
        'We offer a 30-day return policy for eligible products in original condition.',
        'Refunds are processed to the original payment method after inspection.',
        'Return shipping costs are the responsibility of the customer unless the product is defective or incorrect.'
      ]
    },
    {
      title: 'Intellectual Property',
      icon: <Copyright />,
      content: [
        'All content on this website, including text, images, logos, and designs, is the property of Brands-R-khan or its licensors.',
        'You may not use, reproduce, or distribute any content without our prior written consent.'
      ]
    },
    {
      title: 'User Conduct',
      icon: <Policy />,
      content: [
        'You agree not to use the website for any unlawful, fraudulent, or harmful purpose.',
        'You may not attempt to gain unauthorized access to our systems or interfere with the website\'s operation.'
      ]
    },
    {
      title: 'Disclaimers & Limitation of Liability',
      icon: <Warning />,
      content: [
        'Our website and services are provided "as is" without warranties of any kind, express or implied.',
        'Brands-R-khan is not liable for any indirect, incidental, or consequential damages arising from your use of the website or products.'
      ]
    },
    {
      title: 'Changes to Terms',
      icon: <Update />,
      content: [
        'We reserve the right to update or modify these Terms of Service at any time.',
        'Material changes will be communicated via email or website notice.'
      ]
    },
    {
      title: 'Governing Law',
      icon: <Gavel />,
      content: [
        'These terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles.'
      ]
    },
    {
      title: 'Contact Information',
      icon: <Info />,
      content: [
        'For questions about these Terms of Service, please contact us at brandrkhanoffical@gmail.com.'
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 700 }}>
          Terms of Service
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Please read these terms carefully before using our website
        </Typography>
        <Chip 
          label={`Last Updated: ${lastUpdated}`} 
          color="primary" 
          variant="outlined"
        />
      </Box>

      {/* Main Sections */}
      {sections.map((section, index) => (
        <Card key={index} sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ color: 'primary.main', mr: 2 }}>
                {section.icon}
              </Box>
              <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                {section.title}
              </Typography>
            </Box>
            <List dense>
              {section.content.map((item, itemIndex) => (
                <ListItem key={itemIndex} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}

      {/* Footer Note */}
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          This Terms of Service is effective as of {lastUpdated} and will remain in effect except with respect to any changes in its provisions in the future.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService; 