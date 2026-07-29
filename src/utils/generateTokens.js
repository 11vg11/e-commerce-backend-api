// This helper creates a JWT for authenticated users.
// The token is later used to access protected routes.
// Flow: after successful login -> create token -> send it to client -> client uses it for protected requests.

// Import the 'jsonwebtoken' library to create and verify JSON Web Tokens (JWTs)
const jwt = require("jsonwebtoken");

// Define a function named 'generateToken' that takes a 'user' object as an argument
const generateToken = (user) => {
    // Return the signed JWT token generated using the sign method of the jwt library
    return jwt.sign(
        // The first argument is the payload object containing user data to be encoded in the token
        {
            // Store the user's unique ID (_id) in the token's payload under the 'id' key
            id: user._id,
            // Store the user's role in the token's payload under the 'role' key
            role: user.role
        },

        // The second argument is the secret key used to sign the token, retrieved from environment variables
        process.env.JWT_SECRET,


        // The third argument is the options object to configure the token properties
        {
            // Set the expiration duration of the token using the value from environment variables
            expiresIn: process.env.JWT_EXPIRE
        }
        // Close the jwt.sign method call
    );


    // Close the generateToken function definition
};



// Export the generateToken function to make it usable in other parts of the application
module.exports = generateToken;
