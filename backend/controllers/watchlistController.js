const Watchlist = require('../models/Watchlist');

// @desc    Get user's watchlist
// @route   GET /api/users/:id/watchlist
// @access  Private
const getWatchlist = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const watchlist = await Watchlist.find({ userId: req.params.id }).populate('movieId');
    res.json(watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add movie to watchlist
// @route   POST /api/users/:id/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { movieId } = req.body;

    // Check if already in watchlist
    const exists = await Watchlist.findOne({ userId: req.params.id, movieId });
    if (exists) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const watchlistItem = new Watchlist({
      userId: req.params.id,
      movieId,
    });

    await watchlistItem.save();
    const populatedItem = await watchlistItem.populate('movieId');
    res.status(201).json(populatedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Remove movie from watchlist
// @route   DELETE /api/users/:id/watchlist/:movieId
// @access  Private
const removeFromWatchlist = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const watchlistItem = await Watchlist.findOneAndDelete({
      userId: req.params.id,
      movieId: req.params.movieId,
    });

    if (!watchlistItem) {
      return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    res.json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
