// This middleware restricts a route to one or more allowed user roles.
const authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authorization required"
        });
    }

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    return next();
};

module.exports = authorize;
