// This file is the main startup file for the backend.
// It loads the environment, connects to MongoDB, and starts the server.




// At the very top of src/server.js   // that becouse of my notebook PORT hard configuration use below methd 
require('dotenv').config({ override: true });



// Load environment variables from the .env file into process.env
// require("dotenv").config();

// Import the configured Express app
const app = require("./app");

// Import the database connection helper
const connectDatabase = require("./config/database");

// Choose the port to use. If PORT is not set in the environment, use 5000.
const PORT = process.env.PORT || 5000;

// Start the server and connect to the database first
const startServer = async () => {
    // Wait for MongoDB to connect before starting the API
    await connectDatabase();

    // Start listening for incoming HTTP requests
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Run the startup function
startServer();

