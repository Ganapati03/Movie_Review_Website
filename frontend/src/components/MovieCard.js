import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={movie.posterUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.genre} • {movie.releaseYear}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon sx={{ color: 'gold' }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button size="small" component={Link} to={`/movies/${movie._id}`}>
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default MovieCard;
