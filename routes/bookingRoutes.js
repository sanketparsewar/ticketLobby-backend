
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingsController");

// Create a booking
router.post("/", bookingController.createBooking);

// Get all bookings
router.get("/", bookingController.getAllBookings);

// Get a booking by ID
router.get("/:id", bookingController.getBookingById);

// Delete a booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
