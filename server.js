require("dotenv").config(); // Load environment variables
const app = require("./app"); // Import the app.js file
const connectDB = require("./config/db"); // Import database connection

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB.connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
