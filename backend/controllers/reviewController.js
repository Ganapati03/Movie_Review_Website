const Review = require('../models/Review');
const Movie = require('../models/Movie');

// @desc    Get all reviews (public)
// @route   GET /api/reviews
// @access  Public
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find()
      .populate('userId', 'username')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Review.countDocuments();
    
    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get reviews for a movie
// @route   GET /api/reviews/:movieId
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .populate('userId', 'username')
      .sort({ timestamp: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add review
// @route   POST /api/reviews/:movieId
// @access  Private
const addReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (!reviewText || reviewText.trim().length === 0) {
      return res.status(400).json({ message: 'Review text is required' });
    }

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({
      userId: req.user.id,
      movieId: req.params.movieId,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    const review = new Review({
      userId: req.user.id,
      movieId: req.params.movieId,
      rating,
      reviewText: reviewText.trim(),
    });

    await review.save();

    // Populate the review with user info
    const populatedReview = await Review.findById(review._id).populate('userId', 'username');

    res.status(201).json(populatedReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Update movie average rating
    await updateMovieRating(review.movieId);

    res.json(updatedReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update movie average rating
    await updateMovieRating(review.movieId);

    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Helper function to update movie rating
const updateMovieRating = async (movieId) => {
  const reviews = await Review.find({ movieId });
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  await Movie.findByIdAndUpdate(movieId, { averageRating, reviewCount: reviews.length });
};

module.exports = {
  getAllReviews,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
};
