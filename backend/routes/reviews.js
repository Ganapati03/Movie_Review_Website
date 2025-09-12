const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// @route   GET /api/movies/:id/reviews
// @desc    Get reviews for a movie
// @access  Public
router.get('/movies/:id/reviews', getReviews);

// @route   POST /api/movies/:id/reviews
// @desc    Add review
// @access  Private
router.post('/movies/:id/reviews', auth, addReview);

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private
router.put('/:id', auth, updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', auth, deleteReview);

module.exports = router;
