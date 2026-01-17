// Function Arguments:

// Write a calculator program that adds, subtracts, multiplies, divides two arguments.
// Approach - 1: Calling the respective function:

// function sum(a, b) {
//   return a + b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// function divide(a, b) {
//   return a / b;
// }

// function doOperation(a, b, op) {
//   return op(a, b);
// }

// console.log(sum(4, 5));

// Approach - 2: Passing in what needs to be done as an argument:

function sum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function doOperation(a, b, op) {
    return op(a, b);
}

console.log(doOperation(4, 5, multiply));
