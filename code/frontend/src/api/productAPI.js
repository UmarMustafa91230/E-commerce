import axiosClient from './axiosClient';

// Get all products with filters, sorting, and pagination
export const fetchProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  // Add query parameters
  if (params.page) queryParams.append('page', params.page);
  if (params.category) queryParams.append('category', params.category);
  if (params.brand) queryParams.append('brand', params.brand);
  if (params.search) queryParams.append('search', params.search);
  if (params.sort) queryParams.append('sort', params.sort);
  
  const response = await axiosClient.get(`/products?${queryParams.toString()}`);
  return response;
};

// Get single product by ID
export const fetchProductById = async (id) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response;
};

// Create new product (Admin only)
export const createProduct = async (productData) => {
  const formData = new FormData();
  
  // Add product fields
  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('price', productData.price);
  formData.append('category', productData.category);
  formData.append('brand', productData.brand);
  formData.append('stock', productData.stock);
  
  // Add images
  if (productData.images) {
    for (let i = 0; i < productData.images.length; i++) {
      formData.append('images', productData.images[i]);
    }
  }
  
  const response = await axiosClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

// Update product (Admin only)
export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  
  // Add product fields
  if (productData.name) formData.append('name', productData.name);
  if (productData.description) formData.append('description', productData.description);
  if (productData.price) formData.append('price', productData.price);
  if (productData.category) formData.append('category', productData.category);
  if (productData.brand) formData.append('brand', productData.brand);
  if (productData.stock !== undefined) formData.append('stock', productData.stock);
  
  // Add new images
  if (productData.images) {
    for (let i = 0; i < productData.images.length; i++) {
      formData.append('images', productData.images[i]);
    }
  }
  
  const response = await axiosClient.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

// Delete product (Admin only)
export const deleteProduct = async (id) => {
  const response = await axiosClient.delete(`/products/${id}`);
  return response;
};

// Get product reviews
export const getProductReviews = async (productId) => {
  const response = await axiosClient.get(`/products/${productId}/reviews`);
  return response;
};

// Add product review
export const addProductReview = async (productId, reviewData) => {
  const response = await axiosClient.post(`/products/${productId}/reviews`, reviewData);
  return response;
};