const express = require("express");

const app = express();

app.use(express.json());
// function that returns a boolean if the age of the person is more than 14.

function isOldEnough(age) {
    if (age > 14) {
        return true;
    } else {
        return false;
    }
}

function isOldEnoughMiddleware(req, res, next) {
    if (age >= 14) {
        next();
    } else {
        res.status(411).json({
            msge: "Sorry, you are not of age yet",
        });
    }
}

app.get("/ride1", isOldEnoughMiddleware, function (req, res) {
    res.json({
        msge: "You have successfully riden the ride 1",
    });
});

app.get("/ride2", isOldEnoughMiddleware, function (req, res) {
    res.json({
        msge: "You have successfully riden the ride 2",
    });
});

app.listen(3000);
