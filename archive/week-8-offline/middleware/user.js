const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedInfo = jwt.verify(jwtToken, JWT_USER_PASSWORD);

    if (decodedInfo.username) {
        req.userId = decodedInfo.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not authenticated",
        });
    }
}

module.exports = userMiddleware;