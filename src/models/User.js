// This file defines the structure of a user in the database.
// It tells Mongoose what fields the User collection should have.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // Username must be unique and trimmed before saving
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        // Email must be unique and stored in lowercase
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        // Password is required and must be at least 6 characters long
        password: {
            type: String,
            required: true,
            minlength: 6
        },

        // Role controls what actions a user can perform
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true
    }
);

// Create and export the User model so other files can use it
module.exports = mongoose.model("User", userSchema);

