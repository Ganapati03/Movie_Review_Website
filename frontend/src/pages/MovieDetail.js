import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  CircularProgress, 
  Card, 
  CardContent, 
  Chip, 
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  PlayArrow as PlayIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { fetchMovie } from '../store/slices/moviesSlice';
import { addToWatchlist, removeFromWatchlist } from '../store/slices/watchlistSlice';
import ReviewForm from '../components/ReviewForm';
import StarRating from '../components/StarRating';
import { useState } from 'react';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentMovie, loading } = useSelector((state) => state.movies);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: watchlist } = useSelector((state) => state.watchlist);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isInWatchlist = watchlist.some(item => item.movieId._id === id);

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated || !user || !user._id) {
      return;
    }
    
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ userId: user._id, movieId: id }));
    } else {
      dispatch(addToWatchlist({ userId: user._id, movieId: id }));
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!currentMovie) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Movie not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'relative' }}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 600,
                objectFit: 'cover',
                borderRadius: 2,
              }}
              src={currentMovie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={currentMovie.title}
            />
            {isAuthenticated && (
              <IconButton
                onClick={handleWatchlistToggle}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: isInWatchlist ? 'error.main' : 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: isInWatchlist ? 'error.dark' : 'primary.dark',
                  },
                }}
                size="large"
              >
                {isInWatchlist ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            )}
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {currentMovie.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <StarRating rating={currentMovie.averageRating || 0} />
              <Typography variant="body1" color="text.secondary">
                ({currentMovie.reviewCount || 0} reviews)
              </Typography>
              {currentMovie.imdbRating && (
                <Chip 
                  label={`IMDb: ${currentMovie.imdbRating}`} 
                  color="secondary" 
                  variant="outlined"
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip 
                icon={<CalendarIcon />}
                label={currentMovie.releaseYear} 
                color="primary" 
                variant="outlined"
              />
              {Array.isArray(currentMovie.genre) && currentMovie.genre.map((genre, index) => (
                <Chip key={index} label={genre} variant="outlined" />
              ))}
              {currentMovie.rated && (
                <Chip label={currentMovie.rated} color="warning" variant="outlined" />
              )}
            </Box>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Plot Summary
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              {currentMovie.synopsis}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Director
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {currentMovie.director}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GroupIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Cast
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {currentMovie.cast?.join(', ')}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {currentMovie.trailerUrl && (
                <Button 
                  variant="contained" 
                  size="large"
                  href={currentMovie.trailerUrl} 
                  target="_blank"
                  startIcon={<PlayIcon />}
                >
                  Watch Trailer
                </Button>
              )}
              
              {isAuthenticated && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? 'Cancel Review' : 'Write Review'}
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {showReviewForm && (
        <Card sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Write a Review
          </Typography>
          <ReviewForm movieId={id} onReviewAdded={() => setShowReviewForm(false)} />
        </Card>
      )}

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Reviews
            </Typography>
            <Chip 
              label={`${currentMovie.reviews?.length || 0} reviews`} 
              color="primary" 
              variant="outlined"
            />
          </Box>
          
          {currentMovie.reviews?.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {currentMovie.reviews.map((review, index) => (
                <Paper key={review._id} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {review.userId?.username || 'Anonymous'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <StarRating rating={review.rating} size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {review.reviewText}
                  </Typography>
                  {index < currentMovie.reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Paper>
              ))}
            </Box>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'grey.50' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No reviews yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to review this movie!
              </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetail;
