const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const auth = require('../middleware/auth');

// @route   GET /api/watchlist/:userId
// @desc    Get user's watchlist
// @access  Private
router.get('/:userId', auth, getWatchlist);

// @route   POST /api/watchlist/:userId
// @desc    Add movie to watchlist
// @access  Private
router.post('/:userId', auth, addToWatchlist);

// @route   DELETE /api/watchlist/:userId/:movieId
// @desc    Remove movie from watchlist
// @access  Private
router.delete('/:userId/:movieId', auth, removeFromWatchlist);

module.exports = router;
