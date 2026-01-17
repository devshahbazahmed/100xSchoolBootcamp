"use strict";
function greet(name) {
    return `Hello ${name}`;
}
function sum(a, b) {
    return a + b;
}
function isEven(num) {
    if (num % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}
let user = {
    name: 'Shahbaz',
    age: 20,
    address: {
        city: 'Mumbai',
        country: 'India',
        pincode: 400070,
    },
};
let user2 = {
    name: 'John Doe',
    age: 25,
};
function isLegal(user) {
    return user.age >= 18;
}
const ans = isLegal(user);
if (ans) {
    console.log('I can vote');
}
else {
    console.log('I cannot vote');
}
let person = {
    name: 'Raman',
    age: 30,
    // greet: () => {
    // 	return 'Hi';
    // },
    // greet2() {
    // 	return 'Hello';
    // },
};
class Manager {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let newUser = new Manager('John', 30);
console.log(newUser.age);
class Shape {
    area() {
        console.log('Hi I am area');
    }
}
class Rectangle extends Shape {
    constructor(width, height) {
        super(); // calls the constructor of the parent class
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
    }
}
// extends actually gets the implementation of parent class
const r = new Rectangle(1, 2);
r.area();
class User2 {
    constructor(name) {
        this.name = name;
    }
    // in abstract classes you can have default function implementation but not in interfaces
    hello() {
        console.log('hello');
    }
}
class Employee2 extends User2 {
    constructor(name) {
        super(name);
        this.name = name;
    }
    greet() {
        return 'Hi ' + this.name;
    }
}
const teamLead = {
    name: 'harkirat',
    startDate: new Date(),
    department: 'Software developer',
};
const user3 = {
    name: 'harkirat',
    ip: 'asdads',
    gift: '11212r4r',
};
function greet3(user) {
    console.log('Welcome ' + user.name);
}
// Arrays in TS:
function getMax(num) {
    let maxValue = -1000000000;
    for (let i = 0; i < num.length; i++) {
        if (num[i] > maxValue) {
            maxValue = num[i];
        }
    }
    return maxValue;
}
getMax([1, 2, 3, 4]);
function isLegalAge(users) {
    // return users.filter((user) => user.age >= 18);
    let ans = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].age >= 18) {
            ans.push(users[i]);
        }
    }
    return ans;
}
console.log(isLegalAge([
    {
        firstName: 'Raman',
        lastName: 'Verma',
        age: 30,
    },
    {
        firstName: 'Sumit',
        lastName: 'Suman',
        age: 12,
    },
]));
