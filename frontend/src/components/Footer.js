import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Movie Reviews
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Discover and review your favorite movies!
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          {new Date().getFullYear()}
          {' Movie Reviews.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
