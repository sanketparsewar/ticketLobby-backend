const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Changed to String to match your input
  user: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
  },
  bookedSeats: { type: [String], required: true }, // Array of seat strings
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
