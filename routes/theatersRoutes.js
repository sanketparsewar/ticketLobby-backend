const express = require("express");
const {
  addTheater,
  getTheatersByCity,
  getTheatersByCityAndMovie,
} = require("../controllers/theatersController");

const router = express.Router();

// Route to add a new theater
router.post("/", addTheater);

// Route to get theaters in a specific city
router.get("/getTheaters/:cityName", getTheatersByCity);

router.get("/getTheaters/:cityName/:movieId", getTheatersByCityAndMovie);

module.exports = router;
