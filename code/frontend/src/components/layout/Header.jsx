import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Box,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Home,
  Category,
  Login,
  PersonAdd,
  Dashboard,
  Logout,
  Watch,
  Dashboard as DashboardIcon,
  Inventory,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { logout } from '../../redux/slices/authSlice';
import { fetchCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(0, 255, 255, 0.3)',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.7)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#ffffff',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const CyberButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 12,
  fontWeight: 600,
  letterSpacing: '0.02em',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Category />, path: '/products' },
    { text: 'Blog', icon: <Category />, path: '/blog' },
    { text: 'About', icon: <Category />, path: '/about' },
    { text: 'Contact', icon: <Category />, path: '/contact' },
    { text: 'Cart', icon: <ShoppingCart />, path: '/cart', badge: cartItemsCount },
  ];

  let authMenuItems;
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      authMenuItems = [
        { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
        { text: 'Admin Dashboard', icon: <Dashboard />, path: '/admin' },
        { text: 'Product Management', icon: <Inventory />, path: '/admin/products' },
        { text: 'Logout', icon: <Logout />, action: handleLogout },
      ];
    } else {
      authMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
    { text: 'Orders', icon: <Dashboard />, path: '/orders' },
    { text: 'Logout', icon: <Logout />, action: handleLogout },
      ];
    }
  } else {
    authMenuItems = [
    { text: 'Login', icon: <Login />, path: '/login' },
    { text: 'Register', icon: <PersonAdd />, path: '/register' },
  ];
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{
          background: 'rgba(14, 14, 16, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ 
                mr: 2,
                '&:hover': {
                  background: 'rgba(0, 255, 255, 0.1)',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: isMobile ? 1 : 0 }}>
            <Watch sx={{ 
              mr: 1, 
              color: '#00FFFF',
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
            }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#ffffff',
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' },
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                '&:hover': {
                  textShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
                }
              }}
            >
              Brands-R-khan
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4 }}>
              <CyberButton color="inherit" component={Link} to="/" sx={{ mr: 1 }}>
                Home
              </CyberButton>
              <CyberButton color="inherit" component={Link} to="/products" sx={{ mr: 1 }}>
                Products
              </CyberButton>
              <CyberButton color="inherit" component={Link} to="/blog" sx={{ mr: 1 }}>
                Blog
              </CyberButton>
              <CyberButton color="inherit" component={Link} to="/about" sx={{ mr: 1 }}>
                About
              </CyberButton>
              <CyberButton color="inherit" component={Link} to="/contact" sx={{ mr: 1 }}>
                Contact
              </CyberButton>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearch}>
              <StyledInputBase
                placeholder="Search luxury watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ 
                ml: 1,
                '&:hover': {
                  background: 'rgba(0, 255, 255, 0.1)',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                }
              }}
            >
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <IconButton
                edge="end"
                aria-label="account"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ 
                  ml: 1,
                  '&:hover': {
                    background: 'rgba(0, 255, 255, 0.1)',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                  }
                }}
              >
                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  sx={{ 
                    width: 32, 
                    height: 32,
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
                  }}
                >
                  {user?.firstName?.charAt(0)}
                </Avatar>
              </IconButton>
            ) : (
              !isMobile && (
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                  <CyberButton color="inherit" component={Link} to="/login">
                    Login
                  </CyberButton>
                  <CyberButton
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={{ 
                      ml: 1,
                      border: '2px solid #00FFFF',
                      color: '#00FFFF',
                      background: 'rgba(0, 255, 255, 0.05)',
                      '&:hover': {
                        background: 'rgba(0, 255, 255, 0.1)',
                        borderColor: '#4DFFFF',
                        color: '#4DFFFF',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                      }
                    }}
                  >
                    Register
                  </CyberButton>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            background: 'rgba(14, 14, 16, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              color: '#ffffff',
              '&:hover': {
                background: 'rgba(0, 255, 255, 0.1)',
              }
            }
          }
        }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
          Profile
        </MenuItem>
        {user?.role !== 'admin' && (
        <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
          Dashboard
        </MenuItem>
        )}
        {user?.role !== 'admin' && (
        <MenuItem onClick={() => { navigate('/orders'); handleMenuClose(); }}>
          My Orders
        </MenuItem>
        )}
        {user?.role === 'admin' && (
          <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>
            Admin Dashboard
          </MenuItem>
        )}
        {user?.role === 'admin' && (
          <MenuItem onClick={() => { navigate('/admin/products'); handleMenuClose(); }}>
            Product Management
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(14, 14, 16, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            '& .MuiListItem-root': {
              color: '#ffffff',
              '&:hover': {
                background: 'rgba(0, 255, 255, 0.1)',
              }
            }
          }
        }}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemIcon sx={{ color: '#00FFFF' }}>
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="secondary">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            
            {authMenuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={item.path ? Link : 'div'}
                to={item.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.action) item.action();
                }}
              >
                <ListItemIcon sx={{ color: '#00FFFF' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;