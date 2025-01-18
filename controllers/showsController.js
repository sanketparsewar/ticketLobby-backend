const Show = require("../models/Show");
const Theater = require("../models/Theater");
// GET - Fetch all shows
exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movieId", "name") // Only fetch the name field for Movie
      .populate("theaterId", "name address"); // Only fetch the name and address fields for Theater

    res.status(200).json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ message: "Error fetching shows" });
  }
};

// Controller to create a new show
exports.createShow = async (req, res) => {
  try {
    const { movieId, theaterId, date, time, price } = req.body;

    // Validate required fields
    if (!movieId || !theaterId || !date || !time || !price) {
      return res.status(400).json({
        message:
          "Please provide all required fields: movieId, theaterId, date, time, and price.",
      });
    }

    // Ensure theater exists (optional check)
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(400).json({
        message: "Invalid theaterId provided.",
      });
    }

    // Create the show using the Show model
    const newShow = new Show({
      movieId,
      theaterId,
      date,
      time,
      price,
      seats: {
        rows: theater.numberOfRows,
        seatsPerRow: theater.seatsPerRow,
        bookedSeats: [],
      },
    });

    const savedShow = await newShow.save();
    res.status(201).json({
      message: "Show created successfully",
      data: savedShow,
    });
  } catch (error) {
    console.error("Error creating show:", error);
    res.status(500).json({
      message: "Something went wrong while creating the show.",
      error: error.message,
    });
  }
};

// GET - Fetch shows by theaterId and movieId
exports.getShowsByTheaterAndMovie = async (req, res) => {
  try {
    const { theaterId, movieId } = req.params; // Get theaterId and movieId from the request parameters

    // Find shows filtered by theaterId and movieId
    const shows = await Show.find({ theaterId, movieId })
      .populate("movieId", "name") // Only fetch the name field for Movie
      .populate("theaterId", "name address"); // Only fetch the name and address fields for Theater

    if (shows.length === 0) {
      return res
        .status(404)
        .json({
          message: "No shows found for the specified theater and movie",
        });
    }

    res.status(200).json(shows);
  } catch (error) {
    console.error("Error fetching shows by theaterId and movieId:", error);
    res
      .status(500)
      .json({ message: "Error fetching shows by theater and movie" });
  }
};

// Update a show by ID
exports.updateShow = async (req, res) => {
  try {
    const { id } = req.params; // ID of the show to be updated
    const { bookedSeats } = req.body; // Extract bookedSeats from request body

    if (!Array.isArray(bookedSeats)) {
      return res.status(400).json({ error: "bookedSeats must be an array" });
    }

    // Update only the bookedSeats field inside the seats object
    const show = await Show.findByIdAndUpdate(
      id,
      { $set: { "seats.bookedSeats": [...new Set(bookedSeats)] } },
      { new: true, runValidators: true } // Return updated document and apply validation
    );

    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    res.status(200).json(show);
  } catch (error) {
    console.error("Error updating show:", error);
    res.status(500).json({ error: "Failed to update show" });
  }
};
