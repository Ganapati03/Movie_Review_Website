import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/slices/moviesSlice';
import { Container, Typography, Grid, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ limit: 10, sort: '-averageRating' })); // Featured/trending
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Featured Movies
        </Typography>
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
