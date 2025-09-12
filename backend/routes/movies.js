const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const auth = require('../middleware/auth');

// @route   GET /api/movies
// @desc    Get all movies
// @access  Public
router.get('/', getMovies);

// @route   GET /api/movies/:id
// @desc    Get single movie
// @access  Public
router.get('/:id', getMovie);

// @route   POST /api/movies
// @desc    Add new movie
// @access  Private (Admin)
router.post('/', auth, addMovie);

// @route   PUT /api/movies/:id
// @desc    Update movie
// @access  Private (Admin)
router.put('/:id', auth, updateMovie);

// @route   DELETE /api/movies/:id
// @desc    Delete movie
// @access  Private (Admin)
router.delete('/:id', auth, deleteMovie);

module.exports = router;
