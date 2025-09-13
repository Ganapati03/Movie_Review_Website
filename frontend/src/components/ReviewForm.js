import React, { useState } from 'react';
import { Box, TextField, Button, Rating, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../services/api';
import { addReview } from '../store/slices/moviesSlice';

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post(`/reviews/${movieId}`, {
        rating,
        reviewText,
      });
      dispatch(addReview({ movieId, review: response.data }));
      setRating(0);
      setReviewText('');
      toast.success('Review added successfully');
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography component="legend">Rate this movie</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        size="large"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Write your review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mt: 2 }}
        required
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Box>
  );
};

export default ReviewForm;
