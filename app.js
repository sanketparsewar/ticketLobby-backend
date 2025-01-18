const express = require("express");

const cors = require("cors");
// const mongoose = require('mongoose');
const cityRoutes = require("./routes/cityRoutes");
const movieRoutes = require("./routes/moviesRoutes");
const theaterRoutes = require("./routes/theatersRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const showsRoutes = require("./routes/showsRoutes");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cities", cityRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/shows", showsRoutes);

module.exports = app;
