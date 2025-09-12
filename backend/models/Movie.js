const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: { type: [String], required: true },
  releaseYear: { type: Number, required: true },
  director: { type: String, required: true },
  cast: { type: [String], required: true },
  synopsis: { type: String, required: true },
  posterUrl: { type: String, required: true },
  trailerUrl: { type: String, default: '' },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Movie', movieSchema);
