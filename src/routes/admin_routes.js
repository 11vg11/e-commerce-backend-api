// This file defines admin-only routes.
// It shows how a protected route can be limited to users with the admin role.

const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.get(
    "/dashboard",
    protect,
    authorize("admin"),
    (req, res) => {

        res.json({

            success: true,

            message: "Welcome Admin",

            user: req.user

        });

    }
);

module.exports = router;

