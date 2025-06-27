import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  LocalShipping,
  Security,
  SupportAgent,
  Star,
  Watch,
} from '@mui/icons-material';
import { getProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency } from '../utils/formatters';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&h=1080&fit=crop&crop=center',
  'https://manofmany.com/wp-content/uploads/2017/06/32-Top-Luxury-Watch-Brands.jpg',
  'https://th.bing.com/th/id/OIP._pik05c9cpjthnMceOvYBwHaFs?r=0&rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.ZT7sM9afPySBEu9e8dZRAgAAAA?r=0&rs=1&pid=ImgDetMain',
  'https://mcdn.wallpapersafari.com/medium/39/30/vmX0LF.jpg',
  'https://th.bing.com/th/id/OIP.Mi9NBQ0YXRxelmXKXi8rVgHaEK?r=0&rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.92HiZs_dZVttPX84MMrQPwHaF_?r=0&rs=1&pid=ImgDetMain',
];

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items: products, loading, error } = useSelector(state => state.products);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef();

  useEffect(() => {
    dispatch(getProducts({ limit: 6 }));
    heroTimer.current = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(heroTimer.current);
  }, [dispatch]);

  const featuredProducts = products.slice(0, 6);

  const categories = [
    {
      name: "Men's Watches",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
      link: '/products?category=Men\'s Watches',
      description: 'Sophisticated timepieces for the modern gentleman',
      color: '#00FFFF'
    },
    {
      name: "Women's Watches",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop&crop=center",
      link: '/products?category=Women\'s Watches',
      description: 'Elegant designs for the fashion-forward woman',
      color: '#FF00FF'
    },
    {
      name: 'Branded Pre-owned Watches',
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
      link: '/products?category=Branded Pre-owned Watches',
      description: 'Authentic pre-owned luxury watches',
      color: '#00FF88'
    },
    {
      name: 'Top Brand Original Quality Watches',
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop&crop=center",
      link: '/products?category=Top Brand Original Quality Watches',
      description: 'Original quality from premium brands',
      color: '#FFD700'
    },
    {
      name: 'Master Copy Watches',
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=300&fit=crop&crop=center",
      link: '/products?category=Master Copy Watches',
      description: 'High-quality replica timepieces',
      color: '#a020f0'
    },
  ];

  const features = [
    {
      icon: LocalShipping,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $500'
    },
    {
      icon: Security,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: SupportAgent,
      title: '24/7 Support',
      description: 'Round-the-clock customer service'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive prices guaranteed'
    },
  ];

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #0e0e10 0%, #1a1a1a 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%), url('${HERO_IMAGES[heroIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(160, 32, 240, 0.1) 0%, transparent 50%)',
            animation: 'pulse 6s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(14, 14, 16, 0.3) 0%, rgba(26, 26, 26, 0.2) 50%, rgba(14, 14, 16, 0.3) 100%)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <Typography
              variant={isMobile ? 'h2' : 'h1'}
              component="h1"
              gutterBottom
              sx={{ 
                fontWeight: 800, 
                mb: 4,
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 40px rgba(0, 255, 255, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)',
                animation: 'glow 3s ease-in-out infinite alternate',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.1,
              }}
            >
              Brands-R-khan
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ 
                fontWeight: 600, 
                mb: 4, 
                color: '#00FFFF',
                fontFamily: 'Rajdhani, sans-serif',
                textShadow: '0 0 30px rgba(0, 255, 255, 0.6), 1px 1px 2px rgba(0, 0, 0, 0.8)',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              Premium Watch Collection
            </Typography>
            <Typography
              variant="h5"
              sx={{ 
                mb: 6, 
                opacity: 0.95, 
                maxWidth: '600px', 
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
              }}
            >
              Discover luxury timepieces from top brands - Emporio Armani, Michael Kors, Tommy Hilfiger, Hugo Boss, and Fossil. Authentic quality guaranteed.
            </Typography>
            
            {/* Floating Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '80px',
                height: '80px',
                background: 'rgba(0, 255, 255, 0.1)',
                borderRadius: '50%',
                border: '2px solid rgba(0, 255, 255, 0.3)',
                animation: 'float 8s ease-in-out infinite',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '30%',
                right: '15%',
                width: '60px',
                height: '60px',
                background: 'rgba(160, 32, 240, 0.1)',
                borderRadius: '50%',
                border: '2px solid rgba(160, 32, 240, 0.3)',
                animation: 'float 10s ease-in-out infinite reverse',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '60%',
                left: '5%',
                width: '40px',
                height: '40px',
                background: 'rgba(0, 255, 136, 0.1)',
                borderRadius: '50%',
                border: '2px solid rgba(0, 255, 136, 0.3)',
                animation: 'float 12s ease-in-out infinite',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                sx={{ 
                  px: 6, 
                  py: 2, 
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #00FFFF 0%, #a020f0 100%)',
                  color: '#0e0e10',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontFamily: 'Rajdhani, sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4DFFFF 0%, #b44df0 100%)',
                    boxShadow: '0 0 50px rgba(0, 255, 255, 0.8), 0 12px 40px rgba(0, 0, 0, 0.4)',
                    transform: 'translateY(-3px) scale(1.05)',
                  },
                }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ 
                  px: 6, 
                  py: 2, 
                  fontSize: '1.2rem',
                  border: '3px solid #00FFFF',
                  color: '#00FFFF',
                  background: 'rgba(0, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontFamily: 'Rajdhani, sans-serif',
                  textTransform: 'none',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                  '&:hover': {
                    background: 'rgba(0, 255, 255, 0.2)',
                    borderColor: '#4DFFFF',
                    color: '#4DFFFF',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 8px 32px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-3px) scale(1.05)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
            
            {/* Scroll Indicator */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                animation: 'bounce 2s infinite',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                  fontFamily: 'Rajdhani, sans-serif',
                }}
              >
                Scroll to explore
              </Typography>
              <Box
                sx={{
                  width: '2px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #00FFFF 0%, transparent 100%)',
                  borderRadius: '1px',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          textAlign="center" 
          gutterBottom 
          sx={{ 
            mb: 6,
            fontFamily: 'Orbitron, sans-serif',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={2.4} key={category.name}>
              <Card
                component={Link}
                to={category.link}
                sx={{
                  textDecoration: 'none',
                  height: '400px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}80 50%, ${category.color} 100%)`,
                    zIndex: 3,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${category.color}05 0%, transparent 50%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                  },
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${category.color}30`,
                    borderColor: `${category.color}40`,
                    '&::after': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    height: '220px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    margin: 0,
                    padding: 0,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '150px',
                      height: '150px',
                      background: `radial-gradient(circle, ${category.color}10 0%, transparent 70%)`,
                      borderRadius: '50%',
                      filter: 'blur(20px)',
                      animation: 'pulse 4s ease-in-out infinite',
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '16px 16px 0 0',
                      border: `2px solid ${category.color}20`,
                      boxShadow: `0 0 20px ${category.color}20`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      zIndex: 2,
                      margin: 0,
                      padding: 0,
                      '&:hover': {
                        transform: 'scale(1.08)',
                        boxShadow: `0 0 35px ${category.color}40`,
                        borderColor: `${category.color}60`,
                      },
                    }}
                  />
                  {/* Category Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}80 100%)`,
                      color: '#0e0e10',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      fontFamily: 'Rajdhani, sans-serif',
                      boxShadow: `0 0 15px ${category.color}40`,
                      zIndex: 3,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {category.name.includes("Men's") ? "MEN" : 
                     category.name.includes("Women's") ? "WOMEN" :
                     category.name.includes("Pre-owned") ? "PRE-OWNED" :
                     category.name.includes("Original") ? "ORIGINAL" : "MASTER"}
                  </Box>
                </Box>
                <CardContent 
                  sx={{ 
                    p: 3, 
                    position: 'relative', 
                    zIndex: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: 0,
                    '&:last-child': {
                      paddingBottom: 3,
                    },
                  }}
                >
                  <Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{
                        color: '#ffffff',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        mb: 2,
                        textShadow: `0 0 10px ${category.color}40`,
                        margin: 0,
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                        fontSize: '0.9rem',
                        margin: 0,
                      }}
                    >
                      {category.description}
                    </Typography>
                  </Box>
                  
                  {/* Explore Button */}
                  <Box sx={{ textAlign: 'center', mt: 3, marginTop: 'auto' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '8px 16px',
                        background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
                        border: `1px solid ${category.color}30`,
                        borderRadius: '20px',
                        color: category.color,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        fontFamily: 'Rajdhani, sans-serif',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${category.color}30 0%, ${category.color}20 100%)`,
                          borderColor: `${category.color}50`,
                          boxShadow: `0 0 15px ${category.color}30`,
                        },
                      }}
                    >
                      Explore
                      <Box
                        component="span"
                        sx={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: category.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          color: '#0e0e10',
                          fontWeight: 'bold',
                        }}
                      >
                        →
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              }}
            >
              Featured Products
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Hand-picked selections from our premium brand collection
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <LoadingSpinner message="Loading featured products..." />
          ) : featuredProducts.length > 0 ? (
            <Grid container spacing={4}>
              {featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id || product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Watch sx={{ 
                fontSize: 80, 
                color: '#00FFFF',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                mb: 2 
              }} />
              <Typography 
                variant="h6" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                No products available at the moment.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                Check back soon for our latest collection.
              </Typography>
            </Box>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/products"
              sx={{ 
                px: 4, 
                py: 1.5,
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
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Special Offer Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(160, 32, 240, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
          color: 'white',
          py: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px rgba(255, 0, 255, 0.6)',
            }}
          >
            Limited Time Offer
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3, 
              opacity: 0.9,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Get 20% off on all luxury watches. Use code: LUXURY20
          </Typography>
          <Chip
            label="LUXURY20"
            sx={{
              background: 'rgba(255, 0, 255, 0.2)',
              borderColor: 'rgba(255, 0, 255, 0.4)',
              color: '#FF00FF',
              border: '1px solid rgba(255, 0, 255, 0.4)',
              fontSize: '1rem',
              px: 2,
              py: 1,
              mr: 2,
              boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
            }}
          />
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #FF00FF 0%, #a020f0 100%)',
              color: '#ffffff',
              '&:hover': { 
                background: 'linear-gradient(135deg, #FF4DFF 0%, #b44df0 100%)',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)',
              },
              px: 4,
              py: 1.5,
            }}
            component={Link}
            to="/products?category=luxury"
          >
            Shop Luxury Watches
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <feature.icon
                  sx={{
                    fontSize: 48,
                    color: '#00FFFF',
                    mb: 2,
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                  }}
                />
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    color: '#ffffff',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box sx={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        py: 8 
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              color: '#ffffff',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            Stay Updated
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Subscribe to our newsletter for exclusive offers and new arrivals
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: 400,
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(0, 255, 255, 0.5)';
                e.target.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                px: 3, 
                py: 1.5, 
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #00FFFF 0%, #a020f0 100%)',
                color: '#0e0e10',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4DFFFF 0%, #b44df0 100%)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
                  transform: 'translateY(-2px) scale(1.02)',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;