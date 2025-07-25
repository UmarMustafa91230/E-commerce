import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
  MenuItem,
  IconButton,
  Card,
  CardMedia,
  Chip,
} from '@mui/material';
import { Save, Delete, CloudUpload, ArrowBack } from '@mui/icons-material';
import { getProductById, editProduct, clearError } from '../../redux/slices/productSlice';
import { productSchema } from '../../utils/validators';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, selectedProduct } = useSelector(state => state.products);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setExistingImages(selectedProduct.images || []);
    }
  }, [selectedProduct]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 6) {
      toast.error('You can upload up to 6 images only.');
      return;
    }
    const newImages = files.slice(0, 6);
    setSelectedImages(newImages);
    // Create preview URLs
    const previews = newImages.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const removeNewImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

  const removeExistingImage = (index) => {
    const newImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newImages);
  };

  const handleSubmit = async (values) => {
    try {
      const productData = {
        ...values,
        images: selectedImages
      };
      
      await dispatch(editProduct({ id, productData })).unwrap();
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.message || 'Failed to update product');
    }
  };

  const categories = [
    "Men's Watches",
    "Women's Watches", 
    "Branded Pre-owned Watches",
    "Top Brand Original Quality Watches",
    "Master Copy Watches"
  ];

  if (!selectedProduct) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update product information and images
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{
            name: selectedProduct.name || '',
            description: selectedProduct.description || '',
            price: selectedProduct.price || '',
            category: selectedProduct.category || '',
            brand: selectedProduct.brand || '',
            stock: selectedProduct.stock || ''
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Brand"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.brand && Boolean(errors.brand)}
                    helperText={touched.brand && errors.brand}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    margin="normal"
                    InputProps={{
                      startAdornment: '$',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.category && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                    margin="normal"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Current Images
                    </Typography>
                    {existingImages.length > 0 ? (
                      <Grid container spacing={2}>
                        {existingImages.map((image, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                              <CardMedia
                                component="img"
                                height="200"
                                image={image}
                                alt={`Current ${index + 1}`}
                              />
                              <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                                <Chip 
                                  label={`Image ${index + 1}`} 
                                  color="primary" 
                                  size="small" 
                                />
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No images uploaded yet.
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Add New Images
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="image-upload"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                      max={6}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUpload />}
                        sx={{ mb: 2 }}
                      >
                        Upload New Images (Max 6)
                      </Button>
                    </label>
                    <Typography variant="body2" color="text.secondary">
                      New images will replace existing ones. You can upload up to 6 images.
                    </Typography>
                  </Box>

                  {imagePreview.length > 0 && (
                    <Grid container spacing={2}>
                      {imagePreview.map((preview, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="200"
                              image={preview}
                              alt={`New Preview ${index + 1}`}
                            />
                            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                              <IconButton
                                color="error"
                                onClick={() => removeNewImage(index)}
                                size="small"
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting || loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                    >
                      {loading ? 'Updating...' : 'Update Product'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/admin/products')}
                      startIcon={<ArrowBack />}
                    >
                      Back to Products
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default EditProduct; 