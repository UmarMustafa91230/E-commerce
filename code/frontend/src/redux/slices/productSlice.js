import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchProducts, 
  fetchProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../api/productAPI';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params = {}) => {
    const response = await fetchProducts(params);
    // Return only the data part, not the full axios response
    return response.data || response;
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // Return only the data part, not the full axios response
    return response.data || response;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const response = await createProduct(productData);
    // Return only the data part, not the full axios response
    return response.data || response;
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, productData }) => {
    const response = await updateProduct(id, productData);
    // Return only the data part, not the full axios response
    return response.data || response;
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 10000],
    minPrice: 0,
    maxPrice: 10000,
    brand: '',
    rating: 0,
    sortBy: 'name',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both array and object responses
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else if (action.payload && action.payload.data) {
          state.items = action.payload.data;
          state.pagination.total = action.payload.total || 0;
          state.pagination.page = action.payload.page || 1;
          state.pagination.pages = action.payload.pages || 0;
        } else {
          state.items = [];
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get Product by ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both direct data and nested data
        if (action.payload && action.payload.data) {
          state.selectedProduct = action.payload.data;
        } else {
        state.selectedProduct = action.payload;
        }
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        const newProduct = action.payload.data || action.payload;
        if (newProduct) {
          state.items.unshift(newProduct);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.data || action.payload;
        if (updatedProduct) {
          const index = state.items.findIndex(item => item._id === updatedProduct._id);
          if (index !== -1) {
            state.items[index] = updatedProduct;
          }
          if (state.selectedProduct && state.selectedProduct._id === updatedProduct._id) {
            state.selectedProduct = updatedProduct;
          }
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Product
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
        if (state.selectedProduct && state.selectedProduct._id === action.payload) {
          state.selectedProduct = null;
        }
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setPagination, clearSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;