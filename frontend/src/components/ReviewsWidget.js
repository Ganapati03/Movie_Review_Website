import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress,
  Chip,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Person as PersonIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { fetchAllReviews } from '../store/slices/reviewsSlice';
import StarRating from './StarRating';

const ReviewsWidget = ({ 
  title = "Latest Reviews", 
  limit = 3,
  showAvatar = true,
  compact = false
}) => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchAllReviews({ page: 1, limit }));
  }, [dispatch, limit]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (compact) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
            {title}
          </Typography>
          
          <List sx={{ p: 0 }}>
            {reviews.slice(0, limit).map((review, index) => (
              <React.Fragment key={review._id}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  {showAvatar && (
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {(review.userId?.username || 'A').charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {review.userId?.username || 'Anonymous'}
                        </Typography>
                        <StarRating rating={review.rating} size="small" />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.3
                          }}
                        >
                          {review.reviewText}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {review.movieTitle || 'Unknown Movie'}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < limit - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Chip 
            label={`${reviews.length} reviews`} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>

        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {reviews.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {reviews.slice(0, limit).map((review) => (
                <Paper key={review._id} sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    {showAvatar && (
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', mr: 1, mt: 0.5 }}>
                        {(review.userId?.username || 'A').charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {review.userId?.username || 'Anonymous'}
                        </Typography>
                        <StarRating rating={review.rating} size="small" />
                      </Box>
                      
                      <Typography variant="body2" sx={{ 
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 0.5
                      }}>
                        {review.reviewText}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        {review.movieTitle || 'Unknown Movie'}
                      </Typography>
                    </Box>
                  </Box>
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
      </CardContent>
    </Card>
  );
};

export default ReviewsWidget;
