import React, { useEffect } from 'react';
import { Container, Typography, Grid, Box, CircularProgress, Button, Card, CardContent, CardMedia, Chip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchlist, removeFromWatchlist } from '../store/slices/watchlistSlice';
import { Add as AddIcon, Remove as RemoveIcon, Visibility as ViewIcon } from '@mui/icons-material';
import StarRating from '../components/StarRating';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { items: watchlist, loading } = useSelector((state) => state.watchlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWatchlist(user._id));
    }
  }, [dispatch, user]);

  const handleRemoveFromWatchlist = (movieId) => {
    if (!user || !user._id) {
      return;
    }
    dispatch(removeFromWatchlist({ userId: user._id, movieId }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          My Watchlist
        </Typography>
        <Chip 
          label={`${watchlist.length} movies`} 
          color="primary" 
          variant="outlined"
        />
      </Box>

      {watchlist.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8, 
          p: 4,
          backgroundColor: 'grey.50',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: 'grey.300'
        }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Your watchlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start building your watchlist by exploring movies
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            component={Link} 
            to="/movies"
            startIcon={<AddIcon />}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {watchlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card className="movie-card" sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column'
              }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.moviePoster || 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={item.movieTitle}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ 
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {item.movieTitle}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Added on {new Date(item.dateAdded).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      component={Link}
                      to={`/movies/${item.movieId}`}
                      startIcon={<ViewIcon />}
                      sx={{ flex: 1 }}
                    >
                      View
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveFromWatchlist(item.movieId)}
                      sx={{ 
                        backgroundColor: 'error.light',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'error.main',
                        }
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
