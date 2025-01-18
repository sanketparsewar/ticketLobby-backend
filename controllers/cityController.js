const City = require("../models/City");

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

// Get a single city by ID
exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findById(id);

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ error: "Failed to fetch city" });
  }
};

// Create a new city
exports.createCity = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Check if city with the same name already exists
    const existingCity = await City.findOne({ name: name.trim() });

    if (existingCity) {
      return res
        .status(409)
        .json({
          error: "City with the same name already exists",
          city: existingCity,
        });
    }

    const newCity = new City({ name });
    await newCity.save();

    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Failed to create city" });
  }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const city = await City.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(city);
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Failed to update city" });
  }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await City.findByIdAndDelete(id);

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Failed to delete city" });
  }
};
