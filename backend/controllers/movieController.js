const axios = require('axios');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

// Simple in-memory cache for OMDB responses
const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// @desc    Get all movies with filters and pagination from OMDB
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, year, search, rating } = req.query;
    const omdbApiKey = '5841386a'; // Direct API key as provided

    // Build search query
    let searchQuery = search || 'movie';

    // Add genre to search if specified
    if (genre && genre !== 'All') {
      searchQuery = `${genre} ${searchQuery}`;
    }

    // Build URL with parameters
    let url = `http://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=movie&page=${page}&apikey=${omdbApiKey}`;

    // Add year filter if specified
    if (year) {
      url += `&y=${year}`;
    }

    // Check cache first
    const cacheKey = url;
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return sendResponse(res, cached.data, page, limit);
    }

    let data;
    try {
      const response = await axios.get(url, { timeout: 10000 }); // 10 second timeout
      data = response.data;

      // Cache successful response
      if (data.Response === 'True') {
        cache.set(cacheKey, { data, timestamp: Date.now() });
      }
    } catch (apiErr) {
      console.error('OMDB API error:', apiErr.response?.status, apiErr.message);

      // If API fails, try fallback search without filters
      if (genre || year) {
        try {
          const fallbackUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(search || 'movie')}&type=movie&page=${page}&apikey=${omdbApiKey}`;
          const fallbackResponse = await axios.get(fallbackUrl, { timeout: 10000 });
          data = fallbackResponse.data;
          console.log('Using fallback search without filters');
        } catch (fallbackErr) {
          console.error('Fallback search also failed:', fallbackErr.message);
          return res.status(500).json({ message: 'OMDB API is currently unavailable' });
        }
      } else {
        return res.status(500).json({ message: 'OMDB API is currently unavailable' });
      }
    }

    if (data.Response === 'False') {
      return res.json({
        movies: [],
        totalPages: 0,
        currentPage: parseInt(page),
      });
    }

    sendResponse(res, data, page, limit);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};

// Helper function to send response
const sendResponse = (res, data, page, limit) => {
  // Transform OMDB data to match our format
  const movies = data.Search.map(movie => ({
    _id: movie.imdbID,
    title: movie.Title,
    releaseYear: movie.Year,
    posterUrl: movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg',
    omdbId: movie.imdbID,
  }));

  // Calculate total pages based on OMDB's 10 results per page
  const totalResults = parseInt(data.totalResults) || 0;
  const totalPages = Math.ceil(totalResults / 10);

  res.json({
    movies,
    totalPages,
    currentPage: parseInt(page),
    totalResults,
  });
};



// @desc    Get single movie from OMDB
// @route   GET /api/movies/:id
// @access  Public
const getMovie = async (req, res) => {
  try {
    const omdbApiKey = '5841386a'; // Direct API key as provided

    // Fetch OMDB data by imdbID
    let omdbData;
    try {
      const omdbResponse = await axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${omdbApiKey}`);
      omdbData = omdbResponse.data;
    } catch (apiErr) {
      console.error('OMDB API error:', apiErr.response?.status, apiErr.message);
      return res.status(500).json({ message: 'OMDB API is currently unavailable' });
    }

    if (omdbData.Response === 'False') {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const reviews = await Review.find({ movieId: req.params.id }).populate('userId', 'username');

    // Calculate average rating from reviews
    let averageRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = totalRating / reviews.length;
    }

    const movie = {
      _id: omdbData.imdbID,
      title: omdbData.Title,
      genre: omdbData.Genre ? omdbData.Genre.split(',').map(g => g.trim()) : [],
      releaseYear: omdbData.Year,
      rated: omdbData.Rated || '',
      released: omdbData.Released || '',
      runtime: omdbData.Runtime || '',
      director: omdbData.Director || '',
      writer: omdbData.Writer || '',
      cast: omdbData.Actors ? omdbData.Actors.split(',').map(a => a.trim()) : [],
      synopsis: omdbData.Plot || '',
      language: omdbData.Language || '',
      country: omdbData.Country || '',
      awards: omdbData.Awards || '',
      posterUrl: omdbData.Poster || '',
      ratings: omdbData.Ratings || [],
      metascore: omdbData.Metascore || '',
      imdbRating: omdbData.imdbRating || '',
      imdbVotes: omdbData.imdbVotes || '',
      imdbID: omdbData.imdbID,
      type: omdbData.Type || '',
      dvd: omdbData.DVD || '',
      boxOffice: omdbData.BoxOffice || '',
      production: omdbData.Production || '',
      website: omdbData.Website || '',
      averageRating,
      reviewCount: reviews.length,
    };

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
