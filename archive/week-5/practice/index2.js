const express = require("express");
const app = express();

let requestCounter = 0;

function requestIncreaser(req, res, next) {
    requestCounter = requestCounter + 1;
    req.name = "randomShahbaz123";
    console.log(`Total number of requests = ${requestCounter}`);
    next();
}

function realSumHandler(req, res) {
    // main logic
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(req.name);

    res.json({
        ans: a + b,
    });
}

function realMultiplyHandler(req, res) {
    // main logic
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a * b,
    });
}

// Middleware syntax for multiple route handlers
// app.use(requestIncreaser);

// Middleware syntax for individual route handlers

app.get("/sum", requestIncreaser, realSumHandler);

app.get("/multiply", requestIncreaser, realMultiplyHandler);

app.listen(3000);


// In Express, if you want to send JSON data, you first need to parse the json data.
app.use(express.json());
// OR
let middleware = express.json();
app.use(middleware);
// express.json() is a function which calls another function hence we have to call it with brackets.
// OR
// use body-parser library to parse the json data.