const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const checkout = async (userId) => {
    const session = await mongoose.startSession();
    let order;

    try {
        await session.withTransaction(async () => {
            const cart = await Cart.findOne({ user: userId }).session(session);

            if (!cart) {
                throw createError("Cart not found", 404);
            }

            if (cart.items.length === 0) {
                throw createError("Cannot checkout an empty cart", 400);
            }

            const orderItems = [];
            let totalAmount = 0;

            for (const item of cart.items) {
                // Atomically reserve stock. The transaction rolls back every earlier
                // reservation if any cart item is unavailable.
                const product = await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                        isActive: true,
                        stock: { $gte: item.quantity }
                    },
                    { $inc: { stock: -item.quantity } },
                    { new: true, session }
                );

                if (!product) {
                    throw createError("A product in the cart is unavailable or out of stock", 409);
                }

                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity
                });
                totalAmount += product.price * item.quantity;
            }

            order = new Order({
                user: userId,
                items: orderItems,
                totalAmount: Number(totalAmount.toFixed(2))
            });
            await order.save({ session });

            cart.items = [];
            await cart.save({ session });
        });

        return order;
    } finally {
        await session.endSession();
    }
};

const getMyOrders = async (userId) => Order.find({ user: userId }).sort({ createdAt: -1 });

const getOrderById = async (userId, orderId, isAdmin = false) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw createError("Order not found", 404);
    }

    if (!isAdmin && order.user.toString() !== userId.toString()) {
        throw createError("Access denied", 403);
    }

    return order;
};

const getAllOrders = async () => Order.find().sort({ createdAt: -1 });

module.exports = {
    checkout,
    getMyOrders,
    getOrderById,
    getAllOrders
};
