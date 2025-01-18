const Booking = require("../models/Booking");
const mongoose = require("mongoose");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { movie, theater, date, time, user, bookedSeats, totalPrice } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(movie) || !mongoose.Types.ObjectId.isValid(theater)) {
      return res.status(400).json({ message: "Invalid movie or theater ID" });
    }

    // Validate required fields
    if (!date || !time || !user || !bookedSeats || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Log input data for debugging
    console.log("Booking Data:", { movie, theater, date, time, user, bookedSeats, totalPrice });

    // Create a new booking
    const booking = new Booking({
      movie,
      theater,
      date,
      time,
      user,
      bookedSeats,
      totalPrice,
    });

    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error.message, error.stack);
    res.status(500).json({ message: "Error creating booking" });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("movie", "name") // Fetch only the movie name
      .populate("theater", "name address"); // Fetch theater name and address

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id)
      .populate("movie", "name")
      .populate("theater", "name address");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching booking" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    console.error("Error deleting booking:", error.message, error.stack);
    res.status(500).json({ message: "Error deleting booking" });
  }
};
