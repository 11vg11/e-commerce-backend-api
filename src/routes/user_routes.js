// This file defines routes related to the authenticated user.
// The /profile route is protected and only accessible when a valid token is provided.

const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");


router.get("./profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "Prtected route accessed",

        user: req.user
    });

}

)


module.exports = router;