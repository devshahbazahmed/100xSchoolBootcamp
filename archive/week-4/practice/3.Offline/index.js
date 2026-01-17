const express = require("express");
const app = express();
app.use(express.json());

let users = [
    {
        name: "John",
        kidneys: [
            {
                healthy: true,
            },
            {
                healthy: false,
            },
        ],
    },
];

app.get("/", function (req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    // for (let i = 0; i < johnKidneys.length; i++) {
    //     if (johnKidneys[i].healthy) {
    //         numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
    //     }
    // }
    const arrNumberOfHealthyKidneys = johnKidneys.filter((kidney) => {
        if (kidney.healthy === true) {
            numberOfHealthyKidneys++;
        }
        return numberOfHealthyKidneys;
    });
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    });
});

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy,
    });
    res.json({
        msge: "Done!",
    });
});

app.put("/", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msge: "Updated!",
    });
});

// remove all unhealthy kidneys
app.delete("/", function (req, res) {
    if (isThereAtLeastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true,
                });
            }
        }
        users[0].kidneys = newKidneys;
        res.json({ msge: "Done!" });
    } else {
        res.status(411).json({
            msge: "You have no bad kidneys",
        });
    }
});

function isThereAtLeastOneUnhealthyKidney() {
    let atLeastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney;
}

app.listen(3000);
