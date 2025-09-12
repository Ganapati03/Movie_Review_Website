const Movie = require('../models/Movie');
const Review = require('../models/Review');

// @desc    Get all movies with filters and pagination
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, year, search } = req.query;
    const query = {};

    if (genre) query.genre = { $in: [genre] };
    if (year) query.releaseYear = year;
    if (search) query.title = { $regex: search, $options: 'i' };

    const movies = await Movie.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const reviews = await Review.find({ movieId: req.params.id }).populate('userId', 'username');
    res.json({ movie, reviews });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add new movie
// @route   POST /api/movies
// @access  Private (Admin)
const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private (Admin)
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private (Admin)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
