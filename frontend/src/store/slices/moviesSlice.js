import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await api.get('/movies', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch movie');
  }
});

export const addReview = createAsyncThunk('movies/addReview', async ({ movieId, review }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/movies/${movieId}/reviews`, review);
    return { movieId, review: response.data };
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload.movie;
        // Add reviews to the movie object
        if (action.payload.reviews) {
          state.currentMovie.reviews = action.payload.reviews;
        }
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { movieId, review } = action.payload;
        if (state.currentMovie && state.currentMovie._id === movieId) {
          state.currentMovie.reviews.push(review);
          // Update average rating
          const totalRating = state.currentMovie.reviews.reduce((sum, r) => sum + r.rating, 0);
          state.currentMovie.averageRating = totalRating / state.currentMovie.reviews.length;
        }
      });
  },
});

export const { clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
