const express = require("express");

const router = express.Router();


const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/product_controller");



const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.milddleware.js");


// Admin routes


router.post(
    "/",
    protect,
    authorize("admin"),
    createProduct
);


router.post(
    "/:id",
    protect,
    authorize("admin"),
    createProduct
);


router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateProduct
);


router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteProduct
);


module.exports = router;


