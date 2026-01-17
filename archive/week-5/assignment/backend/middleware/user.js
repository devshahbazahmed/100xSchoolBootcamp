const jwt = require("jsonwebtoken");
const JWT_PASSWORD = process.env.JWT_PASSWORD;

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_PASSWORD);

    if (decodedInfo.id) {
        req.userId = decodedInfo.id;
        next();
    } else {
        res.status(404).json({
            message: "You are not authenticated",
        });
    }
}

module.exports = {
    userMiddleware: userMiddleware,
};