// Normal Function in JS

// 1. Find sum of 2 numbers:

function sum(a, b) {
    return a + b;
}

let ans = sum(3, 5);
console.log(ans);

// 2. Find sum from 1 to a number:

function totalSum(num) {
    let ans = 0;
    for (let i = 0; i <= num; i++) {
        ans = ans + i;
    }
    return ans;
}

const soln = totalSum(100);
console.log(soln);

// Synchronous code: Synchronous code is executed line by line, in the order it's written. Each operation waits for the previous one to complete before moving on to next one.

function sum2(num) {
    let ans = 0;
    for (let i = 0; i <= num; i++) {
        ans = ans + i;
    }
    return ans;
}

const ans1 = sum2(100);
console.log(ans1);
const ans2 = sum2(1000);
console.log(ans2);
const ans3 = sum2(10000);
console.log(ans3);

// I/O Heavy operations:

// const fs = require("fs");
// const contents = fs.readFileSync("a.txt", "utf-8");
// console.log(contents);

// const fs = require("fs");
// const contents = fs.readFileSync("a.txt", "utf-8");
// const contents2 = fs.readFileSync("b.txt", "utf-8");
// console.log(contents);
// console.log(contents2);

// I/O bound tasks vs CPU bound tasks:

// CPU bound tasks: These are operations that are limited by the speed and power of the CPU. These tasks require significant computation and processing power, meaning that the performance bottleneck is the CPU itself.

let ans4 = 0;
for (let i = 0; i < 1000000; i++) {
    ans4 = ans4 + i;
}
console.log(ans4);

// I/O bound tasks: I/O-bound tasks are the operations that are limited by the system's input/output capabilities, such as disk I/O, network I/O, or any other form of data transfer. These tasks spend most of their time waiting for I/O operations to complete.

const fs = require("fs");

const contents1 = fs.readFileSync("a.txt", "utf-8");
console.log(contents1);

