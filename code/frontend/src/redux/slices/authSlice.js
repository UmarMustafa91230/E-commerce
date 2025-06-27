import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  logoutUser,
  updateProfile as updateProfileAPI,
  getCurrentUser,
} from '../../api/authAPI';

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await getCurrentUser();
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data || { message: 'Authentication failed' });
  }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateProfileAPI(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Update failed' });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // Try to call the API logout, but don't fail if it doesn't work
  try {
    await logoutUser();
  } catch (error) {
    // API call failed, but we'll still proceed with local logout
  }
  
  // Always clear local storage
  localStorage.removeItem('token');
  return { success: true };
});

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Authentication failed';
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Update failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        // Even if logout fails, clear the state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;