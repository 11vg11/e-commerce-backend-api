// This is a simple test server used to verify that Express is working.
// It is not part of the main app flow, but helps with basic debugging.

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("Received request at /");
    res.send("Hello from test server");
});

app.listen(5000, () => {
    console.log("Test server running on port 5000");
});
