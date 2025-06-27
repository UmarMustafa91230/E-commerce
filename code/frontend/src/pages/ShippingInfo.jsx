import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Divider,
} from '@mui/material';
import {
  LocalShipping,
  Security,
  AccessTime,
  LocationOn,
  CheckCircle,
  Warning,
  Info,
  TrackChanges,
  Payment,
  Support,
} from '@mui/icons-material';

const ShippingInfo = () => {
  const shippingMethods = [
    {
      name: 'Express Delivery',
      description: 'Fastest delivery option with priority handling',
      price: '$25.00',
      deliveryTime: '1-2 business days',
      features: [
        'Priority handling and processing',
        'Real-time tracking updates',
        'Signature confirmation required',
        'Insurance coverage up to $10,000',
        'Saturday delivery available'
      ],
      icon: <LocalShipping color="primary" />,
      color: '#1976d2'
    },
    {
      name: 'Standard Delivery',
      description: 'Reliable delivery with full tracking',
      price: '$15.00',
      deliveryTime: '3-5 business days',
      features: [
        'Standard processing time',
        'Full tracking information',
        'Signature confirmation',
        'Insurance coverage up to $5,000',
        'Business days only'
      ],
      icon: <LocalShipping color="secondary" />,
      color: '#9c27b0'
    },
    {
      name: 'Economy Delivery',
      description: 'Cost-effective shipping option',
      price: '$8.00',
      deliveryTime: '5-8 business days',
      features: [
        'Standard processing',
        'Basic tracking information',
        'No signature required',
        'Insurance coverage up to $1,000',
        'Business days only'
      ],
      icon: <LocalShipping color="success" />,
      color: '#2e7d32'
    }
  ];

  const internationalShipping = [
    {
      region: 'Canada',
      price: '$35.00',
      deliveryTime: '3-5 business days',
      restrictions: 'No restrictions'
    },
    {
      region: 'United Kingdom',
      price: '$45.00',
      deliveryTime: '5-7 business days',
      restrictions: 'Import duties may apply'
    },
    {
      region: 'European Union',
      price: '$50.00',
      deliveryTime: '5-8 business days',
      restrictions: 'VAT and import duties apply'
    },
    {
      region: 'Australia',
      price: '$55.00',
      deliveryTime: '7-10 business days',
      restrictions: 'Import duties may apply'
    },
    {
      region: 'Asia Pacific',
      price: '$60.00',
      deliveryTime: '8-12 business days',
      restrictions: 'Import duties and taxes apply'
    }
  ];

  const shippingPolicies = [
    {
      title: 'Order Processing',
      items: [
        'Orders are processed within 24 hours of payment confirmation',
        'Orders placed after 2 PM EST will be processed the next business day',
        'Weekend and holiday orders are processed on the next business day',
        'You will receive an email confirmation with tracking information'
      ]
    },
    {
      title: 'Package Protection',
      items: [
        'All packages are fully insured during transit',
        'Signature confirmation is required for orders over $500',
        'Packages are carefully packaged to prevent damage',
        'Luxury watch boxes are protected with additional padding'
      ]
    },
    {
      title: 'Delivery Requirements',
      items: [
        'Someone must be present to sign for the package',
        'Valid government-issued ID may be required',
        'Packages cannot be left at doorsteps or with neighbors',
        'Multiple delivery attempts will be made if needed'
      ]
    },
    {
      title: 'International Shipping',
      items: [
        'Import duties and taxes are the responsibility of the recipient',
        'Customs clearance may delay delivery by 1-3 business days',
        'All international packages require signature confirmation',
        'Restricted items may not be available for international shipping'
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 700 }}>
          Shipping Information
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Fast, secure, and reliable shipping for your luxury timepieces
        </Typography>
      </Box>

      {/* Shipping Methods */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Domestic Shipping Options
        </Typography>
        <Grid container spacing={3}>
          {shippingMethods.map((method, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: method.color, mr: 2 }}>
                      {method.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {method.name}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {method.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: method.color }}>
                      {method.price}
                    </Typography>
                    <Chip 
                      label={method.deliveryTime} 
                      size="small" 
                      sx={{ ml: 2 }}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  
                  <List dense sx={{ flexGrow: 1 }}>
                    {method.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* International Shipping */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600, mb: 4, textAlign: 'center' }}>
          International Shipping
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Region</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Shipping Cost</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Delivery Time</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Restrictions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {internationalShipping.map((region, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell sx={{ fontWeight: 600 }}>{region.region}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{region.price}</TableCell>
                  <TableCell>{region.deliveryTime}</TableCell>
                  <TableCell>{region.restrictions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Note:</strong> International shipping costs and delivery times may vary based on customs processing and local regulations. 
            Import duties and taxes are the responsibility of the recipient.
          </Typography>
        </Alert>
      </Box>

      {/* Shipping Policies */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Shipping Policies & Procedures
        </Typography>
        <Grid container spacing={3}>
          {shippingPolicies.map((policy, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {policy.title}
                  </Typography>
                  <List dense>
                    {policy.items.map((item, itemIndex) => (
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
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Important Information */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Important Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrackChanges sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Tracking Your Order
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Once your order ships, you will receive a tracking number via email. 
                You can track your package in real-time through our website or the carrier's website.
              </Typography>
              <Typography variant="body2">
                For orders over $1,000, you will also receive SMS updates on delivery status.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Security & Insurance
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                All packages are fully insured during transit. In the rare event of damage or loss, 
                we will work with you and the carrier to resolve the issue promptly.
              </Typography>
              <Typography variant="body2">
                Luxury watches are packaged with extra care and security measures to ensure safe delivery.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Delivery Exceptions */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Warning sx={{ color: 'warning.main', mr: 2 }} />
            <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
              Delivery Exceptions
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Weather Delays
              </Typography>
              <Typography variant="body2" paragraph>
                Severe weather conditions may delay delivery. We will notify you of any weather-related delays 
                and provide updated delivery estimates.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Address Issues
              </Typography>
              <Typography variant="body2" paragraph>
                Incorrect or incomplete addresses may result in delivery delays. Please ensure your shipping 
                address is accurate and complete when placing your order.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card sx={{ textAlign: 'center', p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Support sx={{ color: 'primary.main', mr: 2 }} />
          <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
            Need Help with Shipping?
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Our customer support team is here to help with any shipping questions or concerns.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2">
            <strong>Email:</strong> brandrkhanoffical@gmail.com
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> +1 (555) 123-4567 (Mon-Fri, 9AM-6PM EST)
          </Typography>
          <Typography variant="body2">
            <strong>Live Chat:</strong> Available on our website during business hours
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default ShippingInfo; 