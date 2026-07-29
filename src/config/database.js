// This file handles the connection to MongoDB.
// It is responsible for opening the database connection used by the app.

// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define an async function to connect to the database
const connectDatabase = async () => {
    try {
        // Try to connect using the MONGO_URI from the environment variables
        const connection = await mongoose.connect(process.env.MONGO_URI);

        // Log the database host when the connection is successful
        console.log(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        // Log the error if the database connection fails
        console.error("MongoDB connection failed", error.message);

        // Stop the app if the database is not available
        process.exit(1);
    }
};

// Export the function so server.js can use it
module.exports = connectDatabase;