// This is a small test server that starts the app and connects to MongoDB.
// It is useful for checking the database connection separately from the main server.

require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/database");

const app = express();

app.get("/", (req, res) => {
    console.log("Received request at /");
    res.send("Hello from test server with DB");
});

const start = async () => {
    await connectDatabase();
    app.listen(5000, () => {
        console.log("Test server with DB running on port 5000");
    });
};

start();
