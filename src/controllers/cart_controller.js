const cartService = require("../services/cart_service");



// GET /api/cart
// Get current user's cart

const getCart = async (req, res) => {

    try {

        const userId = req.user.id;


        const cart = await cartService.getCart(userId);

        res.status(200).json({
            success: true,

            message: "Cart retrived successfully",

            data: cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            messsage: error.message
        });

    }
};


// POST /api/cart
// Add product to cart


const addToCart = async (req, res) => {

    try {
        const userId = req.user.id;


        const cart = await cartService.addToCart(
            userId,
            req.body
        );

        res.status(200).json({

            success: true,

            message: "Product added to cart",

            data: cart
        });
    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};


// PUT /api/cart/:productId
// Update quantity
const updateCartItem = async (req, res) => {

    try {

        const userId = req.user.id;

        const productId = req.params.productId;


        const cart = await cartService.updateCartItem(
            userId,
            productId,
            req.body.quantity
        );


        res.status(200).json({

            success: true,

            message: "Cart updated successfully",

            data: cart

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// DELETE /api/cart/:productId
// Remove product from cart
const removeFromCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const productId = req.params.productId;


        const cart = await cartService.removeFromCart(
            userId,
            productId
        );


        res.status(200).json({

            success: true,

            message: "Product removed from cart",

            data: cart

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// DELETE /api/cart
// Clear cart
const clearCart = async (req, res) => {

    try {

        const userId = req.user.id;


        const cart = await cartService.clearCart(userId);


        res.status(200).json({

            success: true,

            message: "Cart cleared successfully",

            data: cart

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



module.exports = {

    getCart,

    addToCart,

    updateCartItem,

    removeFromCart,

    clearCart

};
