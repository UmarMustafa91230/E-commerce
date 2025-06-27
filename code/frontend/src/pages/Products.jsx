import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
  Pagination,
  Alert,
} from '@mui/material';
import { FilterList, Close } from '@mui/icons-material';
import { getProducts, setFilters, setPagination } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import ProductSort from '../components/product/ProductSort';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Products = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const { items: products, loading, filters, pagination, error } = useSelector(state => state.products);

  // Load initial products on component mount
  useEffect(() => {
    dispatch(getProducts({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    // Get filters from URL params
    const urlFilters = {
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || 'createdAt:desc',
    };

    dispatch(setFilters(urlFilters));
    dispatch(getProducts({ ...urlFilters, page: pagination.page }));
  }, [dispatch, searchParams]);

  // Separate useEffect for pagination changes
  useEffect(() => {
    if (pagination.page > 1) {
      dispatch(getProducts({ ...filters, page: pagination.page }));
    }
  }, [dispatch, pagination.page, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
      if (value && value !== '' && value !== 0) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
    
    // Reset to first page and fetch products
    dispatch(setPagination({ page: 1 }));
    dispatch(getProducts({ ...filters, ...newFilters, page: 1 }));
  };

  const handlePageChange = (event, page) => {
    dispatch(setPagination({ page }));
    window.scrollTo(0, 0);
  };

  const handleSortChange = (sortBy) => {
    handleFilterChange({ sort: sortBy });
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      brand: '',
      search: '',
      sort: 'createdAt:desc',
    };
    handleFilterChange(clearedFilters);
    setSearchParams({});
  };

  const totalPages = pagination.pages || Math.ceil(pagination.total / pagination.limit);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Premium Watch Collection
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover luxury timepieces from top brands - Emporio Armani, Michael Kors, Tommy Hilfiger, Hugo Boss, and Fossil
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Desktop Filters Sidebar */}
        {!isMobile && (
          <Box sx={{ width: 280, flexShrink: 0 }}>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </Box>
        )}

        {/* Mobile Filter Button */}
        {isMobile && (
          <Box sx={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
            <Button
              variant="contained"
              startIcon={<FilterList />}
              onClick={() => setFilterDrawerOpen(true)}
              sx={{ borderRadius: '50px' }}
            >
              Filters
            </Button>
          </Box>
        )}

        {/* Products Section */}
        <Box sx={{ flex: 1 }}>
          {/* Sort and Results Info */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {loading ? 'Loading...' : `${pagination.total} products found`}
            </Typography>
            <ProductSort sortBy={filters.sort} onSortChange={handleSortChange} />
          </Box>

          {/* Products Grid */}
          {loading ? (
            <LoadingSpinner message="Loading products..." />
          ) : products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your filters or search terms
              </Typography>
              <Button variant="outlined" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} lg={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination
                    count={totalPages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 320, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <ProductFilters
          filters={filters}
          onFilterChange={(newFilters) => {
            handleFilterChange(newFilters);
            setFilterDrawerOpen(false);
          }}
          onClearFilters={() => {
            clearFilters();
            setFilterDrawerOpen(false);
          }}
        />
      </Drawer>
    </Container>
  );
};

export default Products;