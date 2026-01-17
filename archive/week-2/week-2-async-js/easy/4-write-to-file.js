const fs = require("fs");
const filePath = "a.txt";
const data = "This is new content to be updated in base file";

fs.writeFile(filePath, data, "utf-8", function (err) {
    if (err) {
        throw new Error("Unable to wrtie the file");
    }
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
            throw new Error("Unable to read the file");
        }
        console.log(data);
    });
});

function expensiveOperation() {
    for (let i = 0; i < 1000000; i++) {
        console.log(i);
    }
}

expensiveOperation();
