import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#DC143C', fontWeight: 600 }}>
              Brands-R-khan
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
              Your premier destination for luxury watches from top brands including Emporio Armani, Michael Kors, Tommy Hilfiger, Hugo Boss, and Fossil. Authentic quality guaranteed.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" size="small">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#DC143C', fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
              <Link href="/blog" color="inherit" underline="hover">
                Blog
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#DC143C', fontWeight: 600 }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/products?category=mens" color="inherit" underline="hover">
                Men's Watches
              </Link>
              <Link href="/products?category=womens" color="inherit" underline="hover">
                Women's Watches
              </Link>
              <Link href="/products?category=preowned" color="inherit" underline="hover">
                Pre-owned Watches
              </Link>
              <Link href="/products?category=topbrand" color="inherit" underline="hover">
                Top Brand Watches
              </Link>
            </Box>
          </Grid>

          

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#DC143C', fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  123 Luxury Street, New York, NY 10001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  brandrkhanoffical@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 4,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            © 2024 Brands-R-khan. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" color="inherit" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="/shipping" color="inherit" underline="hover" variant="body2">
              Shipping Info
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;