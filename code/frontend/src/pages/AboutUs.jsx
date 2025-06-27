import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import {
  Diamond,
  Watch,
  Star,
  People,
  Business,
  Security,
  LocalShipping,
  Support,
  Timeline,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';

const AboutUs = () => {
  const stats = [
    { number: '25+', label: 'Years of Excellence', icon: <Timeline /> },
    { number: '10K+', label: 'Happy Customers', icon: <People /> },
    { number: '500+', label: 'Luxury Timepieces', icon: <Watch /> },
    { number: '50+', label: 'Countries Served', icon: <LocationOn /> },
  ];

  const values = [
    {
      title: 'Craftsmanship',
      description: 'Every timepiece is crafted with precision and attention to detail, ensuring the highest quality standards.',
      icon: <Diamond />,
      color: '#00FFFF'
    },
    {
      title: 'Authenticity',
      description: 'We guarantee the authenticity of every watch in our collection, providing peace of mind to our customers.',
      icon: <Security />,
      color: '#00FF88'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business, from customer service to product quality.',
      icon: <Star />,
      color: '#FFD700'
    },
    {
      title: 'Innovation',
      description: 'We embrace innovation while respecting traditional watchmaking techniques and heritage.',
      icon: <Business />,
      color: '#a020f0'
    }
  ];

  const team = [
    {
      name: 'Ahmed Khan',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'With over 25 years in the luxury watch industry, Ahmed founded Brands-R-khan with a vision to bring the finest timepieces to discerning collectors worldwide.',
      experience: '25+ years'
    },
    {
      name: 'Sarah Johnson',
      position: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Sarah brings her passion for luxury design and attention to detail to every collection, ensuring each piece meets our exacting standards.',
      experience: '15+ years'
    },
    {
      name: 'Michael Chen',
      position: 'Master Watchmaker',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Michael is a certified master watchmaker with expertise in both traditional and modern watchmaking techniques.',
      experience: '20+ years'
    },
    {
      name: 'Emma Wilson',
      position: 'Customer Experience Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Emma ensures every customer receives personalized attention and exceptional service throughout their journey with us.',
      experience: '12+ years'
    }
  ];

  const services = [
    {
      title: 'Expert Consultation',
      description: 'Get personalized advice from our watch experts to find the perfect timepiece for your style and budget.',
      icon: <Support />
    },
    {
      title: 'Worldwide Shipping',
      description: 'Secure and insured shipping to over 50 countries with real-time tracking and signature confirmation.',
      icon: <LocalShipping />
    },
    {
      title: 'Authenticity Guarantee',
      description: 'Every watch comes with a certificate of authenticity and our comprehensive warranty protection.',
      icon: <Security />
    },
    {
      title: 'After-Sales Service',
      description: 'Lifetime support including maintenance, repairs, and expert advice for your luxury timepiece.',
      icon: <Support />
    }
  ];

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #0e0e10 0%, #1a1a1a 100%)', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            About Brands-R-khan
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              maxWidth: 800, 
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Pioneering luxury watch excellence since 1999, we bring the world's finest timepieces to discerning collectors and watch enthusiasts.
          </Typography>
          
          {/* Stats */}
          <Grid container spacing={3} sx={{ mt: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card sx={{ 
                  textAlign: 'center', 
                  p: 3, 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.1)',
                    borderColor: 'rgba(0, 255, 255, 0.2)',
                  },
                }}>
                  <Box sx={{ color: '#00FFFF', mb: 2, filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' }}>
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#ffffff',
                      textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Story */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 600, 
              mb: 4,
              fontFamily: 'Rajdhani, sans-serif',
              textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
            }}
          >
            Our Story
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Founded in 1999 by Ahmed Khan, Brands-R-khan began as a small family business with a simple mission: to bring the world's most prestigious luxury timepieces to passionate collectors and watch enthusiasts.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                What started as a modest showroom in the heart of the city has grown into one of the most trusted names in luxury watch retail. Our journey has been marked by unwavering commitment to authenticity, exceptional customer service, and a deep understanding of the art of watchmaking.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Today, we serve customers across 50+ countries, offering an unparalleled collection of luxury timepieces from the world's most prestigious brands, including Rolex, Patek Philippe, Audemars Piguet, and many more.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="Watchmaking Workshop"
                sx={{ 
                  width: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Our Values */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 600, 
              mb: 4, 
              textAlign: 'center',
              fontFamily: 'Rajdhani, sans-serif',
              textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
            }}
          >
            Our Values
          </Typography>
          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  textAlign: 'center', 
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.1)',
                    borderColor: 'rgba(0, 255, 255, 0.2)',
                  },
                }}>
                  <Box sx={{ color: value.color, mb: 2, filter: `drop-shadow(0 0 10px ${value.color}40)` }}>
                    {value.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Team */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 600, 
              mb: 4, 
              textAlign: 'center',
              fontFamily: 'Rajdhani, sans-serif',
              textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
            }}
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.1)',
                    borderColor: 'rgba(0, 255, 255, 0.2)',
                  },
                }}>
                  <CardContent>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 2,
                        border: '2px solid rgba(0, 255, 255, 0.3)',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        color: '#ffffff',
                        fontFamily: 'Rajdhani, sans-serif',
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#00FFFF',
                        mb: 1,
                        fontWeight: 500,
                      }}
                      gutterBottom
                    >
                      {member.position}
                    </Typography>
                    <Chip 
                      label={member.experience} 
                      size="small" 
                      sx={{ 
                        mb: 2,
                        background: 'rgba(0, 255, 255, 0.2)',
                        borderColor: 'rgba(0, 255, 255, 0.4)',
                        color: '#00FFFF',
                        border: '1px solid rgba(0, 255, 255, 0.4)',
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Services */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 600, 
              mb: 4, 
              textAlign: 'center',
              fontFamily: 'Rajdhani, sans-serif',
              textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
            }}
          >
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.1)',
                    borderColor: 'rgba(0, 255, 255, 0.2)',
                  },
                }}>
                  <Box sx={{ color: '#00FFFF', mb: 2, filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' }}>
                    {service.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {service.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact CTA */}
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(160, 32, 240, 0.1) 100%)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
            }}
          >
            Ready to Experience Luxury?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              opacity: 0.9,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Visit our showroom or browse our online collection to discover your perfect timepiece.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              sx={{
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
              Browse Collection
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              sx={{ 
                color: '#00FFFF',
                border: '2px solid #00FFFF',
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
              Contact Us
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs; 