import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  Pagination, 
  CircularProgress,
  Chip,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { fetchAllReviews } from '../store/slices/reviewsSlice';
import StarRating from '../components/StarRating';

const PublicReviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, totalPages, currentPage, total } = useSelector((state) => state.reviews);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    dispatch(fetchAllReviews({ 
      page, 
      limit: 12,
      search: searchTerm,
      rating: ratingFilter,
      sort: sortBy
    }));
  }, [dispatch, page, searchTerm, ratingFilter, sortBy]);

  const handlePageChange = (event, value) => {
    setPage(value);
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Public Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover what other movie enthusiasts are saying about their favorite films
        </Typography>
        
        {/* Search and Filter Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={ratingFilter}
              label="Rating"
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <MenuItem value="">All Ratings</MenuItem>
              <MenuItem value="5">5 Stars</MenuItem>
              <MenuItem value="4">4+ Stars</MenuItem>
              <MenuItem value="3">3+ Stars</MenuItem>
              <MenuItem value="2">2+ Stars</MenuItem>
              <MenuItem value="1">1+ Stars</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="highest">Highest Rated</MenuItem>
              <MenuItem value="lowest">Lowest Rated</MenuItem>
            </Select>
          </FormControl>
          
          <Chip 
            label={`${total} reviews`} 
            color="primary" 
            variant="outlined"
            icon={<FilterIcon />}
          />
        </Box>
      </Box>

      {reviews.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {reviews.map((review) => (
              <Grid item xs={12} md={6} key={review._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {review.userId?.username || 'Anonymous'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <StarRating rating={review.rating} size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {review.rating}/5
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(review.timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                      {review.reviewText}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        {review.movieTitle || 'Unknown Movie'}
                      </Typography>
                      <Chip 
                        label={`Movie ID: ${review.movieId}`} 
                        size="small" 
                        variant="outlined"
                        color="secondary"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'grey.50' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No reviews found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Be the first to review a movie!
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default PublicReviews;
