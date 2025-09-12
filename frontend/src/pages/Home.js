import React from 'react';
import { Container, Typography } from '@mui/material';
import OmdbDirectFetcher from '../components/OmdbDirectFetcher';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Movie Review Platform
      </Typography>
      <OmdbDirectFetcher />
    </Container>
  );
};

export default Home;
