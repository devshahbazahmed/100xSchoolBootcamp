const jwt = require("jsonwebtoken");

const blackList = new Set();

function userMiddleware(req, res, next) {
    // Implement user auth logic
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    if (blackList.has(token)) return res.status(403).json({ message: "Invalid token" });
    const decodedInfo = jwt.verify(token, process.env.JWT_PASSWORD);

    if (decodedInfo) {
        req.userId = decodedInfo.id;
        next();
    } else {
        res.status(411).json({
            message: "You are not authenticated",
        });
    }
}

module.exports = userMiddleware;