"use strict";
let x = 1; // type inferencing
// x = "harkirat"
console.log(x);
// Problem - 1: Hello World
function greeting(firstName) {
    console.log(`Hello ${firstName}`);
}
greeting('Shahbaz');
// Problem - 2: Sum Function
function sumFunc(a, b) {
    return a + b;
}
let ans = sumFunc(5, 9);
console.log(ans);
// Problem - 3: Return true or false based on if a user is 18+
function isLegal(age) {
    if (age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
const user = isLegal(18);
console.log(user);
// Problem - 4:
function newFunc(fn) {
    setTimeout(fn, 1000);
}
console.log(newFunc(() => console.log('Hi there')));
let greet = () => {
    console.log('Hi there');
};
