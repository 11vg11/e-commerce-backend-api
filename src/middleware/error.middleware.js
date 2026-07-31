const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode
        || (error.name === "CastError" || error.name === "ValidationError" ? 400 : null)
        || (error.code === 11000 ? 409 : null)
        || 500;

    let message = error.message || "Internal server error";

    if (error.code === 11000) {
        message = "A record with that value already exists";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = {
    notFound,
    errorHandler
};
