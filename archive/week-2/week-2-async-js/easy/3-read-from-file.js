const fs = require("fs");
const filePath = "a.txt";
fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) {
        throw new Error("Unable to read file");
    }
    console.log(data);
});

function expensiveOperation() {
    for (let i = 0; i < 1000000; i++) {
        console.log(i);
    }
}

expensiveOperation();
