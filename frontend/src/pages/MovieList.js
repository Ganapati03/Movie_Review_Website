import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Grid, TextField, MenuItem, Pagination, Box, CircularProgress } from '@mui/material';
import { fetchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';

const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, totalPages, currentPage } = useSelector((state) => state.movies);

  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const filters = {
      search,
      genre: genre !== 'All' ? genre : undefined,
      year: year || undefined,
      rating: rating || undefined,
      page,
    };
    dispatch(fetchMovies(filters));
  }, [dispatch, search, genre, year, rating, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Movie Listing
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 200 }}
        />
        <TextField
          select
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 150 }}
        >
          {genres.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 100 }}
        />
        <TextField
          label="Min Rating"
          type="number"
          inputProps={{ min: 0, max: 10, step: 0.1 }}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 100 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MovieList;
