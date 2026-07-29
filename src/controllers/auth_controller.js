// This controller file handles the HTTP requests for authentication.
// It receives incoming requests, calls the service layer, and sends back responses.
// Flow: route -> controller -> service -> database -> response.

const authService = require("../services/auth_service");

// Register a new user
const register = async (req, res) => {
    try {
        // Send the request body to the service layer
        const user = await authService.registerUser(req.body);

        // Return a success response if registration succeeds
        res.status(201).json({
            success: true,
            message: "User registered",
            data: user
        });
    } catch (error) {
        // Return an error response if registration fails
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Login an existing user
const login = async (req, res) => {
    try {
        // Send the email and password to the auth service
        const result = await authService.loginUser(req.body.email, req.body.password);

        // Return the login result and token
        res.json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        // Return a 401 Unauthorized response if login fails
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// Export the controller functions so the route files can use them
module.exports = {
    register,
    login
};
