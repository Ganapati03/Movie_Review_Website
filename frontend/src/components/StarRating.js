import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const StarRating = ({ rating, size = 'medium' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} sx={{ color: 'gold', fontSize: size === 'small' ? '1rem' : '1.5rem' }} />
      ))}
      {hasHalfStar && (
        <StarIcon sx={{ color: 'gold', fontSize: size === 'small' ? '1rem' : '1.5rem', opacity: 0.5 }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={i + fullStars + (hasHalfStar ? 1 : 0)} sx={{ color: 'gray', fontSize: size === 'small' ? '1rem' : '1.5rem' }} />
      ))}
      <Typography variant="body2" sx={{ ml: 1 }}>
        {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};

export default StarRating;
