// This file builds the Express app and connects all the main modules together.
// It is the central place where middleware and routes are registered.
// Request flow: client -> app.js -> routes -> controller -> service -> model/database -> response.

// Import the main Express library
const express = require("express");
// Import CORS so the API can accept requests from other frontends
const cors = require("cors");
// Import Helmet to add basic security headers
const helmet = require("helmet");
// Import Morgan to log incoming requests during development
const morgan = require("morgan");

// Initialize the Express application
const app = express();


// Global Middlewares

// Parse incoming request bodies containing JSON data (makes req.body available)
app.use(express.json());

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// Apply HTTP security headers to protect against common web vulnerabilities
app.use(helmet());

// Log HTTP requests in a concise, developer-friendly format ("dev" profile)
app.use(morgan("dev"));




// Route Definitions

// Import authentication route handlers
const authRoutes = require("./routes/auth_routes");

const userRoutes = require("./routes/user_routes")

const adminRoutes = require("./routes/admin_routes");

const productRoutes = require("./routes/product_routes");

const cartRoutes = require("./routes/cart_routes")

const orderRoutes = require("./routes/order_routes");

const { notFound, errorHandler } = require("./middleware/error.middleware");


// Mount the authentication routes under the /api/users prefix
app.use("/api/users", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);


// Root test route to verify the API is running
app.get("/", (req, res) => {
    res.json({
        message: "E-commerce API running"
    });
});

// Keep these last so unmatched routes and uncaught errors receive one consistent response.
app.use(notFound);
app.use(errorHandler);


// Export the configured app instance to be used by server.js
module.exports = app;
