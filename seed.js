const mongoose = require("mongoose");
const City = require("./models/City");
const Movie = require("./models/Movie");
const Theater = require("./models/Theater");
const Show = require("./models/Show");
const Booking = require("./models/Booking");

// Database connection string
const dbURI = "mongodb://localhost:27017/ticketLobby"; // Replace with your connection string

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
    seedDatabase();
  })
  .catch((error) => console.error("MongoDB connection error:", error));

async function seedDatabase() {
  try {
    // Clear previous collections to avoid duplicates
    await City.deleteMany({});
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await Show.deleteMany({});
    await Booking.deleteMany({});

    console.log("Cleared existing data.");

    // Insert Cities
    const cities = await City.insertMany([
      { name: "Pune" },
      { name: "Mumbai" },
      { name: "Nanded" },
      { name: "Nagpur" },
      { name: "Nashik" },
    ]);

    console.log("Inserted cities.");

    // Insert Movies
    const movies = await Movie.insertMany([
      {
        name: "The Avengers",
        description:
          "If you want to see the Marvel and Avengers movies in order as they happened",
        duration: "200",
        poster:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0B_6M2CIt6rFo6mDQ8UhZ3_qdLdK78jRJHRBVQmovi50z0RW9X5YXLd-C5mM4z_5qAg&usqp=CAU",
        cities: [cities[0]._id, cities[1]._id, cities[2]._id],
      },
      {
        name: "Agni",
        description: "The Agni movie wach in cinemas now",
        duration: "150",
        poster:
          "https://assets.gadgets360cdn.com/pricee/assets/product/202412/Agni_poster1_1733466109.jpg?downsize=215:301",
        cities: [cities[0]._id, cities[1]._id, cities[2]._id],
      },
      {
        name: "Bhool Bhulaiya",
        description: "The Bhulaiya movie wach in cinemas now",
        duration: "180",
        poster:
          "https://assets.gadgets360cdn.com/pricee/assets/product/202411/Bhool_Bhulaiyaa_31_1730870499.jpg?downsize=215:301",
        cities: [cities[0]._id, cities[1]._id, cities[2]._id],
      },
      {
        name: "Singham Again",
        description:
          "If you want to see Singham Again movies in order as they happened,  series in chronological order, in one guide!",
        duration: "200",
        poster:
          "https://assets.gadgets360cdn.com/pricee/assets/product/202410/singham_poster1_1730297030.jpg?downsize=215:301",
        cities: [cities[0]._id, cities[1]._id, cities[2]._id],
      },
      {
        name: "The Miranda Brothers",
        description: "The The Miranda Brothers movie wach in cinemas now",
        duration: "150",
        poster:
          "https://assets.gadgets360cdn.com/pricee/assets/product/202410/The_Miranda_Brothers_poster_1729080034.jpg?downsize=215:301",
        cities: [cities[0]._id, cities[2]._id],
      },
      {
        name: "The Signature",
        description: "The The Signature movie wach in cinemas now",
        duration: "180",
        poster:
          "https://assets.gadgets360cdn.com/pricee/assets/product/202409/The-Signature-poster_1727440600.jpg?downsize=215:301",
        cities: [cities[0]._id, cities[1]._id, cities[2]._id, cities[3]._id],
      },
    ]);

    console.log("Inserted movies.");

    // Insert Theaters
    const theaters = await Theater.insertMany([
      {
        name: "Pvr Palace",
        city: cities[0]._id,
        address: "123 Main Street, NY",
        numberOfRows: "5",
        seatsPerRow: "10",
        totalSeatingCapacity: "50",
        movies: [],
      },
      {
        name: "Hollywood Theater",
        city: cities[1]._id,
        address: "456 Sunset Blvd, LA",
        numberOfRows: "4",
        seatsPerRow: "8",
        totalSeatingCapacity: "32",
        movies: [],
      },
      {
        name: "Downtown Cinema",
        city: cities[2]._id,
        address: "789 Lake Shore Drive, Chicago",
        numberOfRows: "10",
        seatsPerRow: "5",
        totalSeatingCapacity: "50",
        movies: [],
      },
      {
        name: "INOX Palace",
        city: cities[0]._id,
        address: "Over way Street, NY",
        numberOfRows: "5",
        seatsPerRow: "10",
        totalSeatingCapacity: "50",
        movies: [],
      },
      {
        name: "Bolllywood Theater",
        city: cities[1]._id,
        address: "456 Sunset Blvd, LA",
        numberOfRows: "4",
        seatsPerRow: "8",
        totalSeatingCapacity: "32",
        movies: [],
      },
      {
        name: "Downtown Films",
        city: cities[2]._id,
        address: "789 Lake Shore Drive, Chicago",
        numberOfRows: "10",
        seatsPerRow: "5",
        totalSeatingCapacity: "50",
        movies: [],
      },
    ]);

    console.log("Inserted theaters.");

    // Insert Shows
    const shows = await Show.insertMany([
      {
        movieId: movies[0]._id,
        theaterId: theaters[0]._id,
        date: new Date("2024-12-08"),
        time: "18:00",
        price: 150,
      },
      {
        movieId: movies[1]._id,
        theaterId: theaters[0]._id,
        date: new Date("2024-12-08"),
        time: "15:00",
        price: 250,
      },
      {
        movieId: movies[2]._id,
        theaterId: theaters[0]._id,
        date: new Date("2024-12-08"),
        time: "09:00",
        price: 150,
      },
      {
        movieId: movies[1]._id,
        theaterId: theaters[1]._id,
        date: new Date("2024-12-09"),
        time: "09:00",
        price: 120,
      },
      {
        movieId: movies[2]._id,
        theaterId: theaters[1]._id,
        date: new Date("2024-12-09"),
        time: "18:00",
        seats: { rows: 4, seatsPerRow: 8, bookedSeats: [] },
        price: 120,
      },
      {
        movieId: movies[3]._id,
        theaterId: theaters[1]._id,
        date: new Date("2024-12-09"),
        time: "15:00",
        price: 120,
      },
      {
        movieId: movies[2]._id,
        theaterId: theaters[2]._id,
        date: new Date("2024-12-10"),
        time: "15:00",
        price: 180,
      },
      {
        movieId: movies[4]._id,
        theaterId: theaters[2]._id,
        date: new Date("2024-12-10"),
        time: "15:00",
        price: 180,
      },
    ]);

    // console.log('Inserted shows.');

    console.log("Database seeding completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
