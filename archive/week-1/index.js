// Syntax of Javascript: Assignment:

// 1. Variables:

let name = "John"; // Variable that can be reassigned
const age = 30; // Constant variable that cannot be reassigned
var isStudent = true; // Older way to declare variables, function-scoped

const favouriteColor = "Black";

let height = 178;

var likePizza = true;

console.log(favouriteColor);
console.log(height);
console.log(likePizza);

// 2. Data Types:

let number = 42; // Number
let string = "Hello World"; // String
let isActive = false; // Boolean
let numbers = [1, 2, 3]; // Array

// 3. Operators:

let sum = 10 + 5; // Arithmetic operator
let isEqual = 10 === 10; // Comparison operator
let isTrue = true && false; // Logical operator

// 4. Functions:

// Function declaration
function greet(name) {
  return "Hello, " + name;
}

// Function call
let message = greet("John"); // "Hello, John"

function sum2(a, b) {
  return a + b;
}

const result = sum2(4, 5);
console.log(result);
const result2 = sum2(4, "5");
console.log(result2);

function canVote(age) {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}
console.log(canVote(20));
console.log(canVote(17));
console.log(canVote(18));

// 5. If/Else:

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

function isEven(num) {
  if (num % 2 === 0) {
    console.log("The number is even.");
  } else {
    console.log("The number is odd.");
  }
}
isEven(10);
isEven(15);

// 6. Loops:

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // Outputs 0 to 4
}

// While loop
let j = 0;
while (j < 5) {
  console.log(j); // Outputs 0 to 4
  j++;
}

function totalSum(num) {
  let result = 0;
  for (let i = 0; i <= num; i++) {
    result += i;
  }
  return result;
}
console.log(totalSum(5));

// Complex types of Javascript: Assignment:

// 7. Objects:

let user = {
  name: "Harkirat",
  age: 19,
};

console.log("Harkirats age is " + user.age);

function greetUser(user) {
  return `Hello ${user.name}! Your age is ${user.age}.`;
}

const newUser = greetUser({
  name: "Shahbaz",
  age: 28,
});
console.log(newUser);

function greetNewUser(user) {
  if (user.gender === "male") {
    return `Hi Mr. ${user.name}, your age is ${user.age}.`;
  } else if (user.gender === "female") {
    return `Hi Mrs. ${user.name}, your age is ${user.age}`;
  } else {
    return `Hi Others ${user.name}, your age is ${user.age}`;
  }
}
function voteEligibility(user) {
  if (user.age >= 18) {
    return `You are eligible to vote`;
  } else {
    return `You are not eligible to vote`;
  }
}
let newUser2 = {
  name: "Shahbaz",
  age: 28,
  gender: "male",
};
let newUser3 = {
  name: "Aafreen",
  age: 27,
  gender: "female",
};
console.log(greetNewUser(newUser2));
console.log(voteEligibility(newUser2));
console.log(greetNewUser(newUser3));
console.log(voteEligibility(newUser3));

// 8. Arrays:

const users = ["harkirat", "raman", "diljeet"];
const tatalUsers = users.length;
const firstUser = users[0];

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const newArr = arr.filter((num) => num % 2 === 0);
console.log(newArr);

// 9. Array of Objects:

const users2 = [
  {
    name: "Harkirat",
    age: 21,
  },
  {
    name: "raman",
    age: 22,
  },
];

const user1 = users[0];
const user1Age = users[0].age;

function adults(users) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
      console.log(users[i]);
    }
  }
}

const users3 = [
  {
    name: "Ashraf",
    age: 29,
  },
  {
    name: "Ashar",
    age: 17,
  },
  {
    name: "Asad",
    age: 22,
  },
];

adults(users3);

// 10. Object of Objects:

const user2 = {
  name: "harkirat",
  age: 19,
  address: {
    city: "Delhi",
    country: "India",
    address: "1122 DLF",
  },
};

const city = user2.address.city;

function returnUser(users) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18 && users[i].gender === "male") {
      return users[i];
    }
  }
}
const users4 = [
  {
    name: "Shahbaz",
    age: 28,
    gender: "male",
  },
  {
    name: "Insha",
    age: 13,
    gender: "female",
  },
  {
    name: "Ashar",
    age: 17,
    gender: "male",
  },
  {
    name: "Asad",
    age: 22,
    gender: "male",
  },
  {
    name: "Nausheen",
    age: 35,
    gender: "female",
  },
];

console.log(returnUser(users4));
