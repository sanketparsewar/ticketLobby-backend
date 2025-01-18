const Movie = require("../models/Movie");
const City = require("../models/City");

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Get movies by city
exports.getMoviesByCity = async (req, res) => {
  try {
    const { cityName } = req.params;

    // Find city by name
    const city = await City.findOne({ name: cityName });
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    // Find movies available in the city
    const movies = await Movie.find({ cities: city._id });
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by city:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cities");

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const { name, poster, description, duration, cities } = req.body;

    if (!name || !poster || !description || !duration || !cities) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMovie = new Movie({
      name,
      poster,
      description,
      duration,
      cities,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Failed to create movie" });
  }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    // const { name, poster, description, duration, cities } = req.body;
    const body = req.body;
    const movie = await Movie.findByIdAndUpdate(
      id,
      { ...body, cities: [...new Set(body.cities)] },
      { new: true, runValidators: true }
    )
      .populate("cities", "_id name ")
      .select("-__v");

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Failed to update movie" });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};
