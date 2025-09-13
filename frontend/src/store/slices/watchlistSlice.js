import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

export const fetchWatchlist = createAsyncThunk('watchlist/fetchWatchlist', async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/${userId}/watchlist`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch watchlist');
  }
});

export const addToWatchlist = createAsyncThunk('watchlist/addToWatchlist', async ({ userId, movieId }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/users/${userId}/watchlist`, { movieId });
    toast.success('Added to watchlist');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add to watchlist';
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const removeFromWatchlist = createAsyncThunk('watchlist/removeFromWatchlist', async ({ userId, movieId }, { rejectWithValue }) => {
  try {
    await api.delete(`/users/${userId}/watchlist/${movieId}`);
    toast.success('Removed from watchlist');
    return movieId;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to remove from watchlist';
    toast.error(message);
    return rejectWithValue(message);
  }
});

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.movieId._id !== action.payload);
      });
  },
});

export const { clearError } = watchlistSlice.actions;
export default watchlistSlice.reducer;
