import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../store/slices/watchlistSlice';
import { Add as AddIcon, Remove as RemoveIcon, Visibility as ViewIcon } from '@mui/icons-material';
import StarRating from './StarRating';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: watchlist } = useSelector((state) => state.watchlist);
  
  const isInWatchlist = watchlist.some(item => item.movieId._id === movie._id);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated || !user || !user._id) {
      return;
    }
    
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ userId: user._id, movieId: movie._id }));
    } else {
      dispatch(addToWatchlist({ userId: user._id, movieId: movie._id }));
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      }
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={movie.posterUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        {isAuthenticated && (
          <IconButton
            onClick={handleWatchlistToggle}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: isInWatchlist ? 'error.main' : 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: isInWatchlist ? 'error.dark' : 'primary.dark',
              },
            }}
            size="small"
          >
            {isInWatchlist ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        )}
        {movie.averageRating > 0 && (
          <Chip
            label={`${movie.averageRating.toFixed(1)} ⭐`}
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: 'bold',
            }}
            size="small"
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {movie.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} • {movie.releaseYear}
        </Typography>
        
        {movie.averageRating > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <StarRating rating={movie.averageRating} size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({movie.reviewCount || 0} reviews)
            </Typography>
          </Box>
        )}
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <Button 
          size="small" 
          variant="contained"
          component={Link} 
          to={`/movies/${movie._id}`}
          startIcon={<ViewIcon />}
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default MovieCard;
