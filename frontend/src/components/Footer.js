import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <Box sx={{ 
      bgcolor: isDarkMode ? 'grey.900' : 'primary.main', 
      color: 'white', 
      p: 6, 
      mt: 'auto',
      borderTop: isDarkMode ? '1px solid #404040' : 'none'
    }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Movie Reviews
            </Typography>
            <Typography variant="body2" color="white">
              Discover and review your favorite movies!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ color: 'white' }}>Home</Link>
            <Link href="/movies" color="inherit" display="block" sx={{ color: 'white' }}>Movies</Link>
            <Link href="/watchlist" color="inherit" display="block" sx={{ color: 'white' }}>Watchlist</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Account
            </Typography>
            <Link href="/profile" color="inherit" display="block" sx={{ color: 'white' }}>Profile</Link>
            <Link href="/login" color="inherit" display="block" sx={{ color: 'white' }}>Login</Link>
            <Link href="/register" color="inherit" display="block" sx={{ color: 'white' }}>Register</Link>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" color="white" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Movie Reviews. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
