function greet(name: string): string {
	return `Hello ${name}`;
}

function sum(a: number, b: number): number {
	return a + b;
}

function isEven(num: number): boolean {
	if (num % 2 === 0) {
		return true;
	} else {
		return false;
	}
}

// interfaces and types

interface Address {
	city: string;
	country: string;
	pincode: number;
}

interface User {
	name: string;
	age: number;
	address?: Address;
}

interface Office {
	address: Address;
}

let user: User = {
	name: 'Shahbaz',
	age: 20,
	address: {
		city: 'Mumbai',
		country: 'India',
		pincode: 400070,
	},
};

let user2: User = {
	name: 'John Doe',
	age: 25,
};

function isLegal(user: User): boolean {
	return user.age >= 18;
}

const ans = isLegal(user);

if (ans) {
	console.log('I can vote');
} else {
	console.log('I cannot vote');
}

interface People {
	name: string;
	age: number;
	// greet: () => string;
	// greet2(): string;
}

let person: People = {
	name: 'Raman',
	age: 30,
	// greet: () => {
	// 	return 'Hi';
	// },
	// greet2() {
	// 	return 'Hello';
	// },
};

class Manager implements People {
	name: string;
	age: number;

	constructor(name: string, age: number) {
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
	constructor(public width: number, public height: number) {
		super(); // calls the constructor of the parent class
		this.width = width;
		this.height = height;
	}
}
// extends actually gets the implementation of parent class

const r = new Rectangle(1, 2);
r.area();

abstract class User2 {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	abstract greet(): string;
	// in abstract classes you can have default function implementation but not in interfaces
	hello() {
		console.log('hello');
	}
}

class Employee2 extends User2 {
	name: string;
	constructor(name: string) {
		super(name);
		this.name = name;
	}

	greet() {
		return 'Hi ' + this.name;
	}
}

// Types:

type User3 = {
	name: string;
	age: number;
};

// Unions and Intersections:

// Intersection:
type Employee3 = {
	name: string;
	startDate: Date;
};

type Manager3 = {
	name: string;
	department: string;
};

type TeamLead = Employee3 & Manager3;

const teamLead: TeamLead = {
	name: 'harkirat',
	startDate: new Date(),
	department: 'Software developer',
};

// Union:

type GoodUser = {
	name: string;
	gift: string;
};

type BadUser = {
	name: string;
	ip: string;
};

type User4 = GoodUser | BadUser;

const user3: User4 = {
	name: 'harkirat',
	ip: 'asdads',
	gift: '11212r4r',
};

// Create 2 types called user and admin.
// Create a function that takes a user or an admin as an input, and returns a string saying "Welcome [name]".

interface User5 {
	name: string;
	age: number;
}

interface Admin {
	name: string;
	permission: boolean;
}

type UserOrAdmin = User5 | Admin;

function greet3(user: UserOrAdmin) {
	console.log('Welcome ' + user.name);
}

// Arrays in TS:

function getMax(num: number[]) {
	let maxValue = -1000000000;

	for (let i = 0; i < num.length; i++) {
		if (num[i] > maxValue) {
			maxValue = num[i];
		}
	}
	return maxValue;
}

getMax([1, 2, 3, 4]);

interface User6 {
	firstName: string;
	lastName: string;
	age: number;
}

function isLegalAge(users: User6[]) {
	// return users.filter((user) => user.age >= 18);
	let ans = [];
	for (let i = 0; i < users.length; i++) {
		if (users[i].age >= 18) {
			ans.push(users[i]);
		}
	}
	return ans;
}

console.log(
	isLegalAge([
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
	]),
);

// Enums:


enum Direction {
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = 'Right'
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Down)


enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// })
