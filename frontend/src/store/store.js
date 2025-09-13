import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import moviesReducer from './slices/moviesSlice';
import usersReducer from './slices/usersSlice';
import watchlistReducer from './slices/watchlistSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    users: usersReducer,
    watchlist: watchlistReducer,
    reviews: reviewsReducer,
  },
});

export default store;
