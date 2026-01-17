const express = require("express");
const app = express();

// logs the method, timestamp and url
// 1. Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

function loggerMiddleware(req, res, next) {
    console.log(`Method is ${req.method}`);
    console.log(`Timestamp is ${new Date()}`);
    console.log(`Route is ${req.url}`);
    console.log(`Host is ${req.hostname}`);
    next();
}

app.use(loggerMiddleware);

app.get("/add", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sum = a + b;
    res.json({
        message: `Sum is ${sum}`,
    });
});

app.get("/multiply", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const mult = a * b;
    res.json({
        message: `Multiplication is ${mult}`,
    });
});

app.get("/divide", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const division = a / b;
    res.json({
        message: `Division is ${division}`,
    });
});

app.get("/subtract", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sub = a - b;
    res.json({
        message: `Subtraction is ${sub}`,
    });
});

// 2. Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

let requestNumber = 0;
function requestCount(req, res, next) {
    requestNumber = requestNumber + 1;
    console.log(`Request Count is ${requestNumber}`);
    next();
}

app.get("/sum", requestCount, function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b,
    });
});

app.listen(3000);
