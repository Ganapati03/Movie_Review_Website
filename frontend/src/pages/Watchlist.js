import React, { useEffect } from 'react';
import { Container, Typography, Grid, Box, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Watchlist = () => {
  const [watchlist, setWatchlist] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await api.get('/users/me/watchlist');
      setWatchlist(response.data);
    } catch (error) {
      toast.error('Failed to fetch watchlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      await api.delete(`/users/me/watchlist/${movieId}`);
      setWatchlist(watchlist.filter(item => item.movieId._id !== movieId));
      toast.success('Removed from watchlist');
    } catch (error) {
      toast.error('Failed to remove from watchlist');
    }
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
      <Typography variant="h4" gutterBottom>
        My Watchlist
      </Typography>

      {watchlist.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your watchlist is empty
          </Typography>
          <Button variant="contained" component={Link} to="/movies">
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {watchlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 2,
                  }}
                  src={item.movieId.posterUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={item.movieId.title}
                />
                <Typography variant="h6" gutterBottom>
                  {item.movieId.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.movieId.releaseYear} • {item.movieId.genre}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    component={Link}
                    to={`/movies/${item.movieId._id}`}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromWatchlist(item.movieId._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
