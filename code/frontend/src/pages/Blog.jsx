import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Search,
  Favorite,
  Share,
  Bookmark,
  AccessTime,
  Person,
  TrendingUp,
  Diamond,
  Watch,
} from '@mui/icons-material';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    { label: 'All', icon: <Watch /> },
    { label: 'Luxury Watches', icon: <Diamond /> },
    { label: 'Watch Care', icon: <TrendingUp /> },
    { label: 'Brand Stories', icon: <Person /> },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Luxury Timepieces: From Pocket to Smart",
      excerpt: "Discover how luxury watches have evolved over centuries, from the first pocket watches to today's sophisticated smart timepieces that maintain the elegance of traditional craftsmanship.",
      content: "Luxury watches have always been more than just timekeeping devices. They represent status, craftsmanship, and a connection to history. From the intricate pocket watches of the 18th century to the modern smartwatches that blend technology with luxury, the evolution has been remarkable...",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
      category: "Luxury Watches",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Luxury", "History", "Evolution"],
      featured: true
    },
    {
      id: 2,
      title: "Essential Watch Care: Maintaining Your Investment",
      excerpt: "Learn the proper techniques for cleaning, storing, and maintaining your luxury timepiece to ensure it lasts for generations and retains its value.",
      content: "A luxury watch is an investment that deserves proper care and attention. Regular maintenance not only ensures accurate timekeeping but also preserves the watch's value and beauty for future generations...",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=400&fit=crop",
      category: "Watch Care",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "6 min read",
      tags: ["Maintenance", "Care", "Investment"],
      featured: false
    },
    {
      id: 3,
      title: "The Art of Watchmaking: Behind the Scenes at Brands-R-khan",
      excerpt: "Take an exclusive look at our watchmaking process, from design conception to final assembly, showcasing the dedication to quality and precision.",
      content: "At Brands-R-khan, we believe that every timepiece tells a story. Our master watchmakers combine traditional techniques with modern innovation to create watches that are both beautiful and reliable...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      category: "Brand Stories",
      author: "David Rodriguez",
      date: "2024-01-10",
      readTime: "10 min read",
      tags: ["Craftsmanship", "Brand", "Quality"],
      featured: true
    },
    {
      id: 4,
      title: "Choosing Your First Luxury Watch: A Complete Guide",
      excerpt: "Navigate the world of luxury timepieces with our comprehensive guide to selecting your first high-end watch that matches your style and budget.",
      content: "Selecting your first luxury watch can be overwhelming with so many options available. From movement types to case materials, understanding the basics will help you make an informed decision...",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop",
      category: "Luxury Watches",
      author: "Emma Wilson",
      date: "2024-01-08",
      readTime: "12 min read",
      tags: ["Guide", "First Watch", "Selection"],
      featured: false
    },
    {
      id: 5,
      title: "The Psychology of Luxury: Why We Love Expensive Watches",
      excerpt: "Explore the psychological factors that drive our fascination with luxury timepieces and what makes them so desirable.",
      content: "Luxury watches appeal to us on multiple levels - they represent achievement, craftsmanship, and personal style. Understanding the psychology behind our attraction to these timepieces reveals fascinating insights...",
      image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=400&fit=crop",
      category: "Luxury Watches",
      author: "Dr. Lisa Thompson",
      date: "2024-01-05",
      readTime: "7 min read",
      tags: ["Psychology", "Luxury", "Desire"],
      featured: false
    },
    {
      id: 6,
      title: "Seasonal Watch Styling: Adapting Your Collection",
      excerpt: "Learn how to style your watch collection throughout the year, from summer casual to winter formal occasions.",
      content: "Your watch should complement your outfit and the season. Understanding how to match different watch styles with seasonal fashion will enhance your overall appearance...",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
      category: "Watch Care",
      author: "Fashion Editor",
      date: "2024-01-03",
      readTime: "5 min read",
      tags: ["Style", "Fashion", "Seasonal"],
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 0 || 
                           post.category === categories[selectedCategory].label;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
            Brands-R-khan Blog
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Discover the world of luxury timepieces, expert insights, and exclusive stories
          </Typography>
          
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              maxWidth: 500, 
              mb: 4,
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
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              },
            }}
          />

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 4,
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#00FFFF',
                },
                '&:hover': {
                  color: '#4DFFFF',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#00FFFF',
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={category.label}
                icon={category.icon}
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Featured Posts */}
        {selectedCategory === 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 3,
                fontFamily: 'Rajdhani, sans-serif',
                textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
              }}
            >
              Featured Articles
            </Typography>
            <Grid container spacing={3}>
              {featuredPosts.map((post) => (
                <Grid item xs={12} md={6} key={post.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
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
                    <CardMedia
                      component="img"
                      height="250"
                      image={post.image}
                      alt={post.title}
                      sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip 
                          label={post.category} 
                          size="small" 
                          sx={{
                            background: 'rgba(0, 255, 255, 0.2)',
                            borderColor: 'rgba(0, 255, 255, 0.4)',
                            color: '#00FFFF',
                            border: '1px solid rgba(0, 255, 255, 0.4)',
                          }}
                        />
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'rgba(255, 255, 255, 0.7)' }} />
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {post.readTime}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 600,
                          color: '#ffffff',
                          fontFamily: 'Rajdhani, sans-serif',
                        }}
                      >
                        {post.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 2, 
                          flexGrow: 1,
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1, background: 'rgba(0, 255, 255, 0.2)' }}>
                            {post.author.charAt(0)}
                          </Avatar>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {post.author}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            <Favorite />
                          </IconButton>
                          <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            <Share />
                          </IconButton>
                          <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            <Bookmark />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* All Posts */}
        <Box>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 600, 
              mb: 3,
              fontFamily: 'Rajdhani, sans-serif',
              textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
            }}
          >
            {selectedCategory === 0 ? 'All Articles' : `${categories[selectedCategory].label} Articles`}
          </Typography>
          
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
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
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={post.category} 
                        size="small" 
                        sx={{
                          background: 'rgba(0, 255, 255, 0.2)',
                          borderColor: 'rgba(0, 255, 255, 0.4)',
                          color: '#00FFFF',
                          border: '1px solid rgba(0, 255, 255, 0.4)',
                        }}
                      />
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'rgba(255, 255, 255, 0.7)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {post.readTime}
                        </Typography>
                      </Box>
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
                      {post.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2, 
                        flexGrow: 1,
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, background: 'rgba(0, 255, 255, 0.2)' }}>
                          {post.author.charAt(0)}
                        </Avatar>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {post.author}
                        </Typography>
                      </Box>
                      <Button 
                        size="small" 
                        sx={{
                          color: '#00FFFF',
                          border: '1px solid rgba(0, 255, 255, 0.3)',
                          background: 'rgba(0, 255, 255, 0.05)',
                          '&:hover': {
                            background: 'rgba(0, 255, 255, 0.1)',
                            borderColor: '#4DFFFF',
                            color: '#4DFFFF',
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {filteredPosts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography 
                variant="h6" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                No articles found matching your criteria.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Blog; 