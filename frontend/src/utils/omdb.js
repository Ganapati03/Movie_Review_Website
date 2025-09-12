import axios from 'axios';

const OMDB_API_KEY = '5841386a'; // Direct API key as provided
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovieFromOMDB = async (title) => {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      return {
        title: response.data.Title,
        genre: response.data.Genre,
        releaseYear: response.data.Year,
        director: response.data.Director,
        cast: response.data.Actors,
        synopsis: response.data.Plot,
        posterUrl: response.data.Poster,
        trailerUrl: '', // OMDB doesn't provide trailers, can use YouTube API if needed
        averageRating: parseFloat(response.data.imdbRating) || 0,
      };
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    console.error('Error fetching from OMDB:', error);
    throw error;
  }
};

export const searchMoviesFromOMDB = async (query) => {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      return response.data.Search.map(movie => ({
        title: movie.Title,
        releaseYear: movie.Year,
        posterUrl: movie.Poster,
        imdbID: movie.imdbID,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error searching OMDB:', error);
    return [];
  }
};
