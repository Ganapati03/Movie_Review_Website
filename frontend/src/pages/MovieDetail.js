import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Grid, Button, CircularProgress } from '@mui/material';
import { fetchMovie } from '../store/slices/moviesSlice';
import ReviewForm from '../components/ReviewForm';
import StarRating from '../components/StarRating';
import { useState } from 'react';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentMovie, loading } = useSelector((state) => state.movies);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

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
          <Box
            component="img"
            sx={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 2,
            }}
            src={currentMovie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={currentMovie.title}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {currentMovie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarRating rating={currentMovie.averageRating || 0} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              ({currentMovie.reviewCount || 0} reviews)
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom>
            {currentMovie.releaseYear} • {currentMovie.genre}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentMovie.synopsis}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Director: {currentMovie.director}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Cast: {currentMovie.cast?.join(', ')}
            </Typography>
          </Box>
          {currentMovie.trailerUrl && (
            <Button variant="contained" href={currentMovie.trailerUrl} target="_blank" sx={{ mb: 2 }}>
              Watch Trailer
            </Button>
          )}
          {isAuthenticated && (
            <Button
              variant="outlined"
              onClick={() => setShowReviewForm(!showReviewForm)}
              sx={{ ml: 2 }}
            >
              {showReviewForm ? 'Cancel Review' : 'Write Review'}
            </Button>
          )}
        </Grid>
      </Grid>

      {showReviewForm && (
        <Box sx={{ mt: 4 }}>
          <ReviewForm movieId={id} onReviewAdded={() => setShowReviewForm(false)} />
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Reviews ({currentMovie.reviews?.length || 0})
        </Typography>
        {currentMovie.reviews?.length > 0 ? (
          currentMovie.reviews.map((review) => (
            <Box key={review._id} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <StarRating rating={review.rating} size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  by {review.userId?.username || 'Anonymous'}
                </Typography>
              </Box>
              <Typography variant="body1">{review.reviewText}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.timestamp).toLocaleDateString()}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No reviews yet. Be the first to review this movie!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default MovieDetail;
