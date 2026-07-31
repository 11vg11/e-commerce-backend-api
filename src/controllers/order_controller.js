const orderService = require("../services/order_service");

const sendError = (res, error) => {
    const status = error.statusCode || (error.name === "CastError" ? 400 : 500);
    return res.status(status).json({
        success: false,
        message: error.message
    });
};

const checkout = async (req, res) => {
    try {
        const order = await orderService.checkout(req.user.id);
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        });
    } catch (error) {
        return sendError(res, error);
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await orderService.getMyOrders(req.user.id);
        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        return sendError(res, error);
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.user.id, req.params.id, req.user.role === "admin");
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        return sendError(res, error);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        return sendError(res, error);
    }
};

module.exports = {
    checkout,
    getMyOrders,
    getOrderById,
    getAllOrders
};
