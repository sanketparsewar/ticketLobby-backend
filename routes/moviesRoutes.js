const express = require('express');
const {
  getAllMovies,
  getMoviesByCity,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/moviesController');

const router = express.Router();

// Get all movies
router.get('/', getAllMovies);

// Get movies by city
router.get('/city/:cityName', getMoviesByCity);

// Get a single movie by ID
router.get('/:id', getMovieById);

// Create a new movie
router.post('/', createMovie);

// Update a movie by ID
router.put('/:id', updateMovie);

// Delete a movie by ID
router.delete('/:id', deleteMovie);

module.exports = router;
