const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "iamcrazxy";

app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((user) => user.username === username);

    if (user) {
        res.json({
            message: "User already registered",
        });
    }

    const newUser = users.push({
        username,
        password,
    });

    res.json({
        message: "User signed in successfully",
    });
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((user) => user.username === username);

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
    }

    const token = jwt.sign(
        {
            username: user.username,
        },
        JWT_SECRET
    );

    res.json({
        token,
    });
});

app.get("/me", function (req, res) {
    const token = req.headers.token;

    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username;

    const user = users.find((user) => user.username === username);

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
    }

    res.json({
        username: user.username,
        password: user.password,
    });
});

app.listen(3000);
