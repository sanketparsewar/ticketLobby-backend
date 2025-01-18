const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numberOfRows: {
    type: Number,
    required: true,
  },
  seatsPerRow: {
    type: Number,
    required: true,
  },
  totalSeatingCapacity: {
    type: Number,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = mongoose.model("Theater", theaterSchema);

