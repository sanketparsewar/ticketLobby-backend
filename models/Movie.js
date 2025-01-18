
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  poster: { type: String, required: true }, // URL to the movie poster
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true }],
});

module.exports = mongoose.model('Movie', MovieSchema);
