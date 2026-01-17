function setTimeoutPromisified(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}

function callback() {
  console.log("5 sec has passed");
}

setTimeoutPromisified(5000).then(callback);

setTimeout(function () {
  console.log("hi");
  setTimeout(function () {
    console.log("hello");
    setTimeout(function () {
      console.log("hello there");
    }, 5000);
  }, 3000);
}, 1000); // asynchronous code

console.log("outside the callback hell function"); // synchronous code

function setTimeoutPromisified2(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}

// Promise chaining
setTimeoutPromisified2(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified2(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified2(5000);
  })
  .then(function () {
    console.log("hello there");
  });

// Async-Await syntax: syntactic sugar of Promises: different way of writing the same thing
async function solve() {
  await setTimeoutPromisified(1000);
  console.log("hi");
  await setTimeoutPromisified(3000);
  console.log("hello");
  await setTimeoutPromisified(5000);
  console.log("hello there");
}
solve();

// Introducing reject in Promise:
const fs = require("fs");
function readFileAsync(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, "utf-8", function (err, data) {
      if (err) {
        reject("Error in reading the file");
      } else {
        resolve(data);
      }
    });
  });
}

readFileAsync("a.txt")
  .then(function (x) {
    console.log("File has been read: " + x);
  })
  .catch((err) => console.log(err));
