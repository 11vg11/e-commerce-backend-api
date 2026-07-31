const express = require("express");

const router = express.Router();


const cartController = require("../controllers/cart_controller");

const authMiddleware = require("../middleware/auth.middleware");



// @route   GET /api/cart
// @desc    Get current user's cart
// @access  Customer

router.get(
    "/",
    authMiddleware,
    cartController.getCart

)


// @route   POST /api/cart
// @desc    Add product to cart
// @access  Customer
router.post(
    "/",
    authMiddleware,
    cartController.addToCart
);


// @route   PUT /api/cart/:productId
// @desc    Update product quantity
// @access  Customer
router.put(
    "/:productId",
    authMiddleware,
    cartController.updateCartItem
);


// @route   DELETE /api/cart/:productId
// @desc    Remove product from cart
// @access  Customer
router.delete(
    "/:productId",
    authMiddleware,
    cartController.removeFromCart
);


// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Customer
router.delete(
    "/",
    authMiddleware,
    cartController.clearCart
);


module.exports = router;




