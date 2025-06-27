import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Add, Delete, CloudUpload } from '@mui/icons-material';
import { addProduct, clearError } from '../../redux/slices/productSlice';
import { productSchema } from '../../utils/validators';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.products);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedImages.length > 6) {
      toast.error('You can upload up to 6 images only.');
      return;
    }
    const newImages = [...selectedImages, ...files].slice(0, 6);
    setSelectedImages(newImages);
    // Create preview URLs
    const previews = newImages.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

  const handleSubmit = async (values) => {
    try {
      const productData = {
        ...values,
        images: selectedImages
      };
      
      await dispatch(addProduct(productData)).unwrap();
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.message || 'Failed to create product');
    }
  };

  const categories = [
    "Men's Watches",
    "Women's Watches", 
    "Branded Pre-owned Watches",
    "Top Brand Original Quality Watches",
    "Master Copy Watches"
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create New Product
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add a new product to your inventory
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{
            name: '',
            description: '',
            price: '',
            category: '',
            brand: '',
            stock: ''
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
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
                    select
                    label="Brand"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.brand && Boolean(errors.brand)}
                    helperText={touched.brand && errors.brand}
                    margin="normal"
                  >
                    <MenuItem value="">Select Brand</MenuItem>
                    <MenuItem value="Emporio Armani">Emporio Armani</MenuItem>
                    <MenuItem value="Michael Kors">Michael Kors</MenuItem>
                    <MenuItem value="Tommy Hilfiger">Tommy Hilfiger</MenuItem>
                    <MenuItem value="Hugo Boss">Hugo Boss</MenuItem>
                    <MenuItem value="Fossil">Fossil</MenuItem>
                  </TextField>
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
                      Product Images
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
                        Upload Images (Max 6)
                      </Button>
                    </label>
                    <Typography variant="body2" color="text.secondary">
                      You can upload up to 6 images. First image will be the main image.
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
                              alt={`Preview ${index + 1}`}
                            />
                            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                              {index === 0 && (
                                <Typography variant="caption" color="primary">Main Image</Typography>
                              )}
                              <IconButton
                                color="error"
                                onClick={() => removeImage(index)}
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
                      startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                    >
                      {loading ? 'Creating...' : 'Create Product'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/admin/products')}
                    >
                      Cancel
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

export default CreateProduct; 