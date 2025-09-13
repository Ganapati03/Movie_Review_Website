import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress,
  Chip,
  Paper,
  Divider,
  Button,
  Collapse,
  IconButton
} from '@mui/material';
import { 
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { fetchAllReviews } from '../store/slices/reviewsSlice';
import StarRating from './StarRating';

const PublicReviewsPanel = ({ 
  title = "Latest Reviews", 
  limit = 5, 
  showExpandButton = true,
  maxHeight = 400,
  variant = "panel" // "panel" or "compact"
}) => {
  const dispatch = useDispatch();
  const { reviews, loading, total } = useSelector((state) => state.reviews);
  const [expanded, setExpanded] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(limit);

  useEffect(() => {
    dispatch(fetchAllReviews({ page: 1, limit: expanded ? 20 : limit }));
  }, [dispatch, limit, expanded]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setReviewsToShow(expanded ? limit : 20);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  const displayReviews = reviews.slice(0, reviewsToShow);

  if (variant === "compact") {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Chip 
              label={`${total} reviews`} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>

          <Box sx={{ maxHeight: maxHeight, overflowY: 'auto' }}>
            {displayReviews.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {displayReviews.map((review) => (
                  <Paper key={review._id} sx={{ p: 2, backgroundColor: 'grey.50' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        {review.userId?.username || 'Anonymous'}
                      </Typography>
                      <StarRating rating={review.rating} size="small" />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem' }}>
                      {new Date(review.timestamp).toLocaleDateString()}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ 
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {review.reviewText}
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {review.movieTitle || 'Unknown Movie'}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">
                  No reviews yet
                </Typography>
              </Paper>
            )}
          </Box>

          {showExpandButton && reviews.length > limit && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                size="small"
                onClick={handleToggleExpand}
                endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                {expanded ? 'Show Less' : `Show More (${reviews.length - limit} more)`}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }

  // Panel variant (default)
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Chip 
            label={`${total} reviews`} 
            color="primary" 
            variant="outlined"
          />
        </Box>

        <Box sx={{ maxHeight: maxHeight, overflowY: 'auto' }}>
          {displayReviews.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {displayReviews.map((review) => (
                <Paper key={review._id} sx={{ p: 2 }}>
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

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {review.movieTitle || 'Unknown Movie'}
                  </Typography>
                </Paper>
              ))}
            </Box>
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
        </Box>

        {showExpandButton && reviews.length > limit && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="outlined"
              onClick={handleToggleExpand}
              endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {expanded ? 'Show Less' : `Show More (${reviews.length - limit} more)`}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PublicReviewsPanel;
