import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  Paper,
  Divider,
  IconButton,
  TextField,
  Tab,
  Tabs,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  LocalShipping,
  Security,
  Assignment,
} from '@mui/icons-material';
import { getProductById, clearSelectedProduct } from '../redux/slices/productSlice';
import { addItemToCart, fetchCart } from '../redux/slices/cartSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency, getStockStatus } from '../utils/formatters';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: product, loading } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getProductById(id));
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Product Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The product you're looking for doesn't exist or has been removed.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  const handleAddToCart = async () => {
    console.log('Add to Cart clicked', product);
    if (!isAuthenticated) {
      toast.info('Please log in to add items to cart');
      navigate('/login', { state: { from: { pathname: `/products/${product._id}` } } });
      return;
    }
    if (product.stock >= quantity) {
      try {
        await dispatch(addItemToCart({ productId: product._id, quantity })).unwrap();
        await dispatch(fetchCart());
      toast.success(`${quantity} x ${product.name} added to cart!`);
      } catch (error) {
        toast.error(error || 'Failed to add item to cart');
      }
    } else {
      toast.error('Insufficient stock!');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    if (newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mr: 2 }}>
                {product.images.slice(0, 6).map((img, idx) => (
                  <Box
                    key={img}
                    component="img"
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: selectedImage === img ? '2px solid #1976d2' : '1px solid #eee',
                      cursor: 'pointer',
                      boxShadow: selectedImage === img ? 2 : 0,
                      transition: 'border 0.2s, box-shadow 0.2s',
                    }}
                  />
                ))}
              </Box>
            )}
            {/* Main Image */}
            <Box
              component="img"
              src={selectedImage || product.images?.[0] || '/placeholder-image.jpg'}
              alt={product.name}
              sx={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 2,
                maxWidth: 400,
                minWidth: 0,
              }}
            />
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            {/* Breadcrumb */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Home / Products / {product.category} / {product.name}
            </Typography>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {product.name}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.brand}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.averageRating || 0} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.averageRating?.toFixed(1) || '0.0'}) • {product.numReviews || 0} reviews
              </Typography>
            </Box>

            {/* Price */}
            <Typography variant="h3" color="primary" sx={{ mb: 2, fontWeight: 700 }}>
              {formatCurrency(product.price)}
            </Typography>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <Chip
                label={stockStatus.text}
                sx={{
                  bgcolor: stockStatus.color,
                  color: 'white',
                  fontWeight: 500,
                }}
              />
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  size="small"
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value) || 1;
                    if (qty >= 1 && qty <= product.stock) {
                      setQuantity(qty);
                    }
                  }}
                  inputProps={{
                    style: { textAlign: 'center', width: 60 },
                    min: 1,
                    max: product.stock,
                  }}
                  variant="standard"
                  size="small"
                  sx={{ mx: 1 }}
                />
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  size="small"
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{ flex: 1 }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <IconButton
                onClick={handleFavoriteToggle}
                sx={{ border: 1, borderColor: 'divider' }}
              >
                {isFavorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
              </IconButton>
              
              <IconButton
                onClick={handleShare}
                sx={{ border: 1, borderColor: 'divider' }}
              >
                <Share />
              </IconButton>
            </Box>

            {/* Features */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping color="action" />
                <Typography variant="body2" color="text.secondary">
                      Free Shipping
                    </Typography>
                  </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security color="action" />
                <Typography variant="body2" color="text.secondary">
                  Secure Payment
                    </Typography>
                  </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment color="action" />
                <Typography variant="body2" color="text.secondary">
                  Warranty
                    </Typography>
                  </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={1}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
            <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {product.description}
              </Typography>
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Product Details
                  </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Brand:</Typography>
                  <Typography variant="body2">{product.brand}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Category:</Typography>
                  <Typography variant="body2">{product.category}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Stock:</Typography>
                  <Typography variant="body2">{product.stock} units</Typography>
                </Box>
            </Grid>
          </Grid>
        </TabPanel>

          <TabPanel value={selectedTab} index={2}>
          <Typography variant="h6" gutterBottom>
            Customer Reviews
          </Typography>
            {product.ratings && product.ratings.length > 0 ? (
              product.ratings.map((review, index) => (
                <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      by {review.name}
              </Typography>
                  </Box>
                  <Typography variant="body1">{review.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No reviews yet. Be the first to review this product!
              </Typography>
            )}
        </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetail;