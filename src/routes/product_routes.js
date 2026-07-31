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

const authorize = require("../middleware/role.middleware");


// Public product routes
router.get("/", getAllProducts);

router.get("/:id", getProductById);

// Admin product routes


router.post(
    "/",
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
