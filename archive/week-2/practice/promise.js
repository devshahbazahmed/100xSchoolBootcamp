function logName() {
  console.log("Shahbaz");
}

setTimeout(logName, 3000);

// defining a promise is hard
// using a promise is easy

// A promise in Javascript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

function main() {
  console.log("Completion of main function");
}
setTimeout(main, 3000); // call back the main function.

function setTimeoutPromisified(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });

  // returning an object of promise class
}
setTimeoutPromisified(3000).then(() => {
  console.log("Promise is resolved");
}); // syntactically cleaner

function promiseCallback(resolve) {
  console.log(resolve);
  setTimeout(resolve, 5000);
}

function main() {
  console.log("main function");
}
promiseCallback(main);

function random(resolve) {
  // resolve is also a function
  setTimeout(resolve, 3000);
}

let p = new Promise(random); // supposed to return you something eventually

// using the eventual value returned by the promise
function callback() {
  console.log("promise completed");
}
console.log(p);
p.then(callback);

// create a promisified version of fs.readFile, fs.writeFile and cleanFile.

const fs = require("fs");
function readFile(fileName) {
  return new Promise(function (resolve) {
    fs.readFile(fileName, "utf-8", function (err, data) {
      resolve(data);
    });
  });
}

function callback(contents) {
  console.log(contents);
}

readFile("a.txt").then(callback);

function writeFile(fileName, data) {
  return new Promise(function (resolve) {
    fs.writeFile(fileName, data, "utf-8", function (err) {
      console.log("File written successfully");
      resolve(data);
    });
  });
}

writeFile("a.txt", "Hello There! My name is Shahbaz").then(readFile("a.txt"));

function cleanFile(fileName, cb) {
  return new Promise(function (resolve) {
    fs.readFile(fileName, "utf-8", function (err, data) {
      data = data.trim();
      fs.writeFile(fileName, data, function () {
        resolve();
      });
    });
  });
}

function cleanCallBack() {
  console.log("File is cleaned");
}

cleanFile("a.txt").then(cleanCallBack);

// create your own promise class

class Promise2 {
  constructor(fn) {
    function afterDone() {
      this.resolve();
    }
    fn(afterDone);
  }
  then(callback) {
    this.resolve = callback;
  }
}

function readTheFile(resolve) {
  setTimeout(function () {
    console.log("callback based setTimeout completed");
    resolve();
  }, 3000);
}

function setTimeoutPromisified2() {
  return new Promise2(readTheFile);
}

let cb = setTimeoutPromisified2();
function callback2() {
  console.log("callback is now called");
}
cb.then(callback2);
