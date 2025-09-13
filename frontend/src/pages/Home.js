import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Movie as MovieIcon, Star as StarIcon } from '@mui/icons-material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Welcome to MovieWeb
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Discover, review, and manage your favorite movies. Join our community of movie enthusiasts!
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: { xs: 4, md: 6 } }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/movies"
            startIcon={<MovieIcon />}
            sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 1.5 } }}
          >
            Browse Movies
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/register"
            startIcon={<StarIcon />}
            sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 1.5 } }}
          >
            Join Now
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 4, md: 8 }, mt: { xs: 6, md: 8 } }}>
          <Box sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
            <MovieIcon sx={{ fontSize: { xs: 50, md: 60 }, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Discover Movies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Browse thousands of movies with detailed information, ratings, and reviews
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
            <StarIcon sx={{ fontSize: { xs: 50, md: 60 }, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Rate & Review
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Share your thoughts and rate movies to help others discover great films
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
            <MovieIcon sx={{ fontSize: { xs: 50, md: 60 }, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Personal Watchlist
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Keep track of movies you want to watch and manage your personal collection
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
