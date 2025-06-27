import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  Grid,
  MenuItem,
  Pagination,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Visibility,
  CloudUpload,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getProducts, removeProduct, clearError } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error, pagination } = useSelector(state => state.products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null });

  const categories = [
    "Men's Watches",
    "Women's Watches", 
    "Branded Pre-owned Watches",
    "Top Brand Original Quality Watches",
    "Master Copy Watches"
  ];

  useEffect(() => {
    loadProducts();
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const loadProducts = (page = 1) => {
    const params = {
      page,
      search: searchTerm,
      category: categoryFilter,
      sort: sortBy
    };
    dispatch(getProducts(params));
  };

  const handleSearch = () => {
    loadProducts(1);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'category') {
      setCategoryFilter(value);
    } else if (filterType === 'sort') {
      setSortBy(value);
    }
    loadProducts(1);
  };

  const handlePageChange = (event, page) => {
    loadProducts(page);
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeProduct(deleteDialog.productId)).unwrap();
      toast.success('Product deleted successfully!');
      setDeleteDialog({ open: false, productId: null });
      loadProducts(pagination.page);
    } catch (error) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    } else if (stock < 10) {
      return <Chip label={`Low Stock (${stock})`} color="warning" size="small" />;
    } else {
      return <Chip label={`In Stock (${stock})`} color="success" size="small" />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Product Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/admin/products/create')}
          >
            Add New Product
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Category"
              value={categoryFilter}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Sort By"
              value={sortBy}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <MenuItem value="createdAt:desc">Newest First</MenuItem>
              <MenuItem value="createdAt:asc">Oldest First</MenuItem>
              <MenuItem value="name:asc">Name A-Z</MenuItem>
              <MenuItem value="name:desc">Name Z-A</MenuItem>
              <MenuItem value="price:asc">Price Low to High</MenuItem>
              <MenuItem value="price:desc">Price High to Low</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Products Table */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((product) => (
                    <TableRow key={product._id} hover>
                      <TableCell>
                        <Box
                          component="img"
                          src={product.images?.[0] || '/placeholder-image.jpg'}
                          alt={product.name}
                          sx={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
                          {product.description?.substring(0, 50)}...
                        </Typography>
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>
                        <Chip label={product.category} color="primary" size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatPrice(product.price)}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStockStatus(product.stock)}</TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/products/${product._id}`)}
                            size="small"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                            size="small"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => setDeleteDialog({ open: true, productId: product._id })}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={pagination.pages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, productId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, productId: null })}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminProducts; 