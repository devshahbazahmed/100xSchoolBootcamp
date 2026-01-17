const express = require("express");
const app = express();

app.use(express.json());

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

app.listen(3000);


// Offline-1: Axios vs Fetch
// const axios = require("axios");
// function main() {
//     fetch("https://jsonplaceholder.typicode.com/todos")
//         .then(async (response) => {
//             const json = await response.json();
//             console.log(json.todos.length);
//         });
// }

// async function main() {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//     const json = await response.json();
//     console.log(json.todos.length);
// }

// async function main() {
//     const response = await fetch("https://www.toptal.com/developers/postbin/1706261117585-5522551864851", {
//         method: "POST",
//         body: {
//             username: "shahbaz",
//             password: "123456",
//         },
//         headers: {
//             "Authorization": "Bearer 123",
//         }
//     });
//     const textualData = response.text();
//     console.log(textualData);
// }

// async function main() {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
//     const responsePost = await axios.post("https://jsonplaceholder.typicode.com/todos");
//     console.log(response.data.todos.length);
// }

// async function main() {
//     const response = await axios.post("https://www.toptal.com/developers/postbin/1706261117585-5522551864851", {
//         username: "shahbaz",
//         password: "1234567"
//     }, {
//         headers: {
//             "Authorization": "Bearer 123",
//         }
//     });
//     console.log(response.data);
// }

// main();

// Offline-2: Maps, Filters and Arrow Functions:

// function sum(a, b) {
//     return a + b;
// }
// const sum2 = (a, b) => {
//     return a + b;
// }
// const ans = sum(2, 5);
// const ans2 = sum2(4, 9);
// console.log(ans);
// console.log(ans2);

// Map:
// Problem statement: transform given input array of numbers into multiplication of 2 of each element.
// solution-1:
// const inputArr = [1, 2, 3, 4, 5];

// let newArr = [];

// for (let i = 1; i <= inputArr.length; i++) {
//     newArr.push(i * 2);
// }

// console.log(newArr);

// solution-2:
// const inputArr = [1, 2, 3, 4, 5];

// function transform(i) {
//     return i * 2;
// }
// const newArr = inputArr.map((num) => num * 2);
// console.log(newArr);

// assignment: Create your own map function:
// function newMap(arr, fn) {
//     let newArray = []
//     for (let i = 0; i < arr.length; i++) {
//         const transformedValue = parseInt(fn(arr[i]));
//         newArray.push(transformedValue);
//     }
//     return newArray;
// }
// const inputArr = [1, 2, 3, 4, 5];

// const ans = newMap(inputArr, function (num) {
//     return num * 2;
// })
// console.log(ans);

// Filter:
// Problem Statement: Given an input array, give me back all the even values from it.

// const arr = [1, 2, 3, 4, 5];

// solution-1:

// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 === 0) {
//         newArr.push(arr[i]);
//     }
// }
// console.log(newArr);

// solution-2:

// const ans = arr.filter((n) => {
//     if (n % 2 === 0) {
//         return true;
//     } else {
//         return false;
//     }
// });
// console.log(ans);