const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview, getAllReviews } = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// @route   GET /api/reviews
// @desc    Get all reviews (public)
// @access  Public
router.get('/', getAllReviews);

// @route   GET /api/reviews/:movieId
// @desc    Get reviews for a specific movie
// @access  Public
router.get('/:movieId', getReviews);

// @route   POST /api/reviews/:movieId
// @desc    Add review for a movie
// @access  Private
router.post('/:movieId', auth, addReview);

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private
router.put('/:id', auth, updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', auth, deleteReview);

module.exports = router;
