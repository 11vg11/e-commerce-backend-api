// This middleware protects private routes.
// It checks whether a request has a valid JWT before allowing access.
// Flow: request arrives -> middleware checks token -> if valid, attach req.user -> next route/controller.

const jwt = require("jsonwebtoken");

// Middleware to protect routes by checking for a valid JWT
const protect = (req, res, next) => {
    try {
        // Read the Authorization header from the incoming request
        const authHeader = req.headers.authorization;

        // If no auth header is present, deny access
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No authorization token provided"
            });
        }

        // Extract the token from the header format: "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // If the token is missing, reject the request
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Continue to the next middleware or controller
        next();
    } catch (error) {
        // If the token is invalid, expired, or malformed, block access
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = protect;