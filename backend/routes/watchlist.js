const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const auth = require('../middleware/auth');

// @route   GET /api/users/:id/watchlist
// @desc    Get user's watchlist
// @access  Private
router.get('/users/:id/watchlist', auth, getWatchlist);

// @route   POST /api/users/:id/watchlist
// @desc    Add movie to watchlist
// @access  Private
router.post('/users/:id/watchlist', auth, addToWatchlist);

// @route   DELETE /api/users/:id/watchlist/:movieId
// @desc    Remove movie from watchlist
// @access  Private
router.delete('/users/:id/watchlist/:movieId', auth, removeFromWatchlist);

module.exports = router;
