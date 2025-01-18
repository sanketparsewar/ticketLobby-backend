// Controller to add a new theater to a specific city
const City = require("../models/City");
const Movie = require("../models/Movie");
const Theater = require("../models/Theater");

// Controller to add a new theater to a specific city
exports.addTheater = async (req, res) => {
  try {
    const { name, address, numberOfRows, seatsPerRow, cityName } = req.body;

    if (!name || !address || !numberOfRows || !seatsPerRow || !cityName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify if the city exists
    const city = await City.findOne({ name: cityName });

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    // Calculate total seating capacity
    const totalSeatingCapacity = numberOfRows * seatsPerRow;

    const newTheater = new Theater({
      name,
      address,
      numberOfRows,
      seatsPerRow,
      totalSeatingCapacity,
      city: city._id,
    });

    const savedTheater = await newTheater.save();

    res.status(201).json({
      message: "Theater added successfully",
      theater: savedTheater,
    });
  } catch (error) {
    console.error("Error adding theater:", error);
    res.status(500).json({ error: "Failed to add theater" });
  }
};

// Controller to get all theaters by city name
exports.getTheatersByCity = async (req, res) => {
  try {
    const { cityName } = req.params;

    // Verify if city exists
    const city = await City.findOne({ name: cityName });

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    // Fetch all theaters linked to this city's ID
    const theaters = await Theater.find({ city: city._id });

    res.status(200).json({
      message: "Theaters fetched successfully",
      theaters,
    });
  } catch (error) {
    console.error("Error fetching theaters:", error);
    res.status(500).json({ error: "Failed to fetch theaters" });
  }
};

// Controller to get theaters by city name and movie ID
exports.getTheatersByCityAndMovie = async (req, res) => {
  try {
    const { cityName, movieId } = req.params;

    // Verify if the city exists
    const city = await City.findOne({ name: cityName });

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }
    // Verify if the movie exists (assuming you have a Movie model)
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Fetch theaters linked to the city's ID and showing the specified movie
    const theaters = await Theater.find({ 
      city: city._id, 
      movies: movieId // Assuming each theater has a "movies" array containing movie IDs
    });

    if (theaters.length === 0) {
      return res.status(404).json({ error: "No theaters found for the specified city and movie" });
    }

    res.status(200).json({
      message: "Theaters fetched successfully",
      theaters,
    });
  } catch (error) {
    console.error("Error fetching theaters:", error);
    res.status(500).json({ error: "Failed to fetch theaters" });
  }
};
