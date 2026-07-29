// This middleware checks whether the logged-in user has the required role.
// It is used to protect admin-only routes.

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Authorizationn required"
            });
        }


        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };





};



module.exports = authorize;

