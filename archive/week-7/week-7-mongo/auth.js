const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_SECRET);

    if (decodedInformation) {
        req.userId = decodedInformation.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials",
        });
    }
}

module.exports = {
    authMiddleware,
    JWT_SECRET,
};
