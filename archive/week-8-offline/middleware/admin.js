const { Admin } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedInfo = jwt.verify(jwtToken, JWT_ADMIN_PASSWORD);

    if (decodedInfo.username) {
        req.adminId = decodedInfo.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not authenticated",
        });
    }
}

module.exports = adminMiddleware;