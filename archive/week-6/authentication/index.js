const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
const JWT_SECRET = "iamcrazxy";
const users = [];

// function generateToken() {
//     let token = "";
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }

//     return token;
// }

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find((user) => user.username === username)) {
        res.json({
            message: "You have already signed up",
        });
    }

    users.push({
        username,
        password,
    });

    res.json({
        message: "You have signed up successfully",
    });
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        const token = jwt.sign(
            {
                username: username,
            },
            JWT_SECRET
        ); // convert their username to jwt
        // user.token = token;
        res.json({
            token: token,
        });
    } else {
        res.json({
            message: "Invalid username and password",
        });
    }
});

app.get("/me", function (req, res) {
    const token = req.headers.token; // jwt

    const decodedInfo = jwt.verify(token, JWT_SECRET);
    const username = decodedInfo.username;
    const user = users.find((user) => user.username === username);

    if (user) {
        res.json({
            username: user.username,
            password: user.password,
        });
    } else {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
});

app.listen(3000);
