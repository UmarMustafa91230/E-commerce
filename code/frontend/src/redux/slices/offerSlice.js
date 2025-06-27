import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOffers, applyOfferCode } from '../../api/offerAPI';

export const getOffers = createAsyncThunk(
  'offers/getOffers',
  async () => {
    const response = await fetchOffers();
    return response;
  }
);

export const applyOffer = createAsyncThunk(
  'offers/applyOffer',
  async (offerCode, { rejectWithValue }) => {
    try {
      const response = await applyOfferCode(offerCode);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  available: [],
  applied: [],
  loading: false,
  error: null,
};

const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Offers
      .addCase(getOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.available = action.payload;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Apply Offer
      .addCase(applyOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.applied.push(action.payload);
      })
      .addCase(applyOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to apply offer';
      });
  },
});

export const { clearError } = offerSlice.actions;
export default offerSlice.reducer;