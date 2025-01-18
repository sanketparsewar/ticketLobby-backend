const express = require("express");
const {
  getAllShows,
  getShowsByTheaterAndMovie,
  updateShow,
  createShow,
} = require("../controllers/showsController");

const router = express.Router();

// Route to get all show data
router.get("/", getAllShows);
router.post("/", createShow);
router.get("/:theaterId/:movieId", getShowsByTheaterAndMovie);
router.put("/:id", updateShow);

module.exports = router;
