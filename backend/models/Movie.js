const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: [{
    type: String,
    required: true,
  }],
  releaseYear: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  cast: [{
    type: String,
    trim: true,
  }],
  synopsis: {
    type: String,
    required: true,
    trim: true,
  },
  posterUrl: {
    type: String,
    default: '',
  },
  trailerUrl: {
    type: String,
    default: '',
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  imdbID: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
