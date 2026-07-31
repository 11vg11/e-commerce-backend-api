const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user's cart
const getCart = async (userId) => {
    let cart = await Cart.findOne({
        user: userId
    }).populate("items.product");

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: []
        });
    }

    return cart;
};

// Add product to cart
const addToCart = async (userId, data) => {
    const { productId, quantity } = data;

    // Change 1: Validate positive integer quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Quantity must be a positive integer");
    }

    // Check product exists
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
        throw new Error("Product not found");
    }

    // Check initial stock for new item request
    if (product.stock < quantity) {
        throw new Error("Not enough product stock");
    }

    // Find user's cart
    let cart = await Cart.findOne({
        user: userId
    });

    // Create cart if not exists
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: []
        });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );

    if (existingItem) {
        // Calculate target total and check cumulative stock
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
            throw new Error("Not enough product stock");
        }

        existingItem.quantity = newQuantity;
    } else {
        cart.items.push({
            product: productId,
            quantity: quantity
        });
    }

    await cart.save();

    return cart.populate("items.product");
};

// Update product quantity
const updateCartItem = async (userId, productId, quantity) => {
    // Change 2: Validate positive integer quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Quantity must be a positive integer");
    }

    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const item = cart.items.find(
        item => item.product.toString() === productId
    );

    if (!item) {
        throw new Error("Product not in cart");
    }

    // Verify requested quantity against actual database stock
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
        throw new Error("Product not found");
    }

    if (quantity > product.stock) {
        throw new Error("Not enough product stock");
    }

    item.quantity = quantity;

    await cart.save();

    return cart.populate("items.product");
};

// Remove product from cart
const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();

    return cart.populate("items.product");
};

// Clear cart
const clearCart = async (userId) => {
    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = [];

    await cart.save();

    return cart;
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};