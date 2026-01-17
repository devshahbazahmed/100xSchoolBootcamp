const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "123123";

app.use(express.json());

const users = [];

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.username) {
        req.username = decodedData.username;
        next();
    } else {
        res.json({
            message: "You are not logged in",
        });
    }
    // if (token) {
    //     jwt.verify(token, JWT_SECRET, (err, decoded) => {
    //         if (err) {
    //             res.status(401).json({
    //                 message: "Unauthorized",
    //             });
    //         } else {
    //             req.user = decoded;
    //             next();
    //         }
    //     });
    // } else {
    //     res.json({
    //         message: "You are not authorized",
    //     });
    // }
}

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((user) => user.username === username);

    if (user) {
        res.status(401).json({
            message: "User already exists",
        });
    }

    users.push({
        username,
        password,
    });

    res.json({
        message: "You are signed in",
    });
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!foundUser) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    } else {
        const token = jwt.sign(
            {
                username: foundUser.username,
            },
            JWT_SECRET
        );

        res.json({
            token,
        });
    }
});

app.get("/me", authMiddleware, function (req, res) {
    const user = users.find((user) => user.username === req.username);

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
    } else {
        res.json({
            username: user.username,
            password: user.password,
        });
    }
});

app.listen(3000);
