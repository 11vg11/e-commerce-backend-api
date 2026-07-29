// This file defines the public authentication routes.
// It connects the URLs /register and /login to the controller functions.

const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/auth_controller");



router.post("/register", register);


router.post("/login", login);


module.exports = router