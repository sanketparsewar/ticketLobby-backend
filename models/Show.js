const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Example: "6:30 PM"
    required: true,
  },
  seats: {
    rows: {
      type: Number, // Example: 10 rows
    
    },
    seatsPerRow: {
      type: Number, // Example: 20 seats per row
   
    },
    bookedSeats: {
      type: [String], // Example: ["A1", "A2"]
      default: [],
    },
  },
  price: {
    type: Number, // Price per seat
    required: true,
  },
});

showSchema.pre("save", async function (next) {
  if (!this.isModified("seats")) {
    const Theater = mongoose.model("Theater"); // Avoid circular dependency
    const theater = await Theater.findById(this.theaterId);
    if (theater) {
      this.seats = {
        rows: theater.numberOfRows,
        seatsPerRow: theater.seatsPerRow,
        bookedSeats: [],
      };
    } else {
      return next(new Error("Invalid theaterId"));
    }
  }
  next();
});

module.exports = mongoose.model("Show", showSchema);
