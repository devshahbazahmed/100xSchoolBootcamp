const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    //  authMiddleware logic here
    try {
        const authToken = req.headers.token;
        const token = authToken.split(" ")[1];
        const decodedInfo = jwt.verify(token, secret);

        if (decodedInfo.id) {
            req.userId = decodedInfo.id;
            next();
        } else {
            res.status(403).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    authMiddleware,
};
