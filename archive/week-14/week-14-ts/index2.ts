let firstName: string = 'Shahbaz';
let age: number = 20;

interface UserType {
	firstName: string;
	age: number;
	lastName: string;
}

function greet2(anotherUser: UserType) {}

let anotherUser: UserType = {
	firstName: 'Shahbaz',
	age: 20,
	lastName: 'Ansari',
};

type User = {
	name: string;
	age: number;
};

type SumInput = string | number;

// ts can sum number + number
// ts can sum string + number
// ts can sum string + string

// ts cant sum (string | number) + (string | number)

function sum(a: SumInput, b: SumInput): SumInput {
	return a + b;
}

console.log(sum(10));

interface Manager {
	name: string;
	age: number;
}

interface Employee {
	name: string;
	department: string;
}

type TeamLead = Employee & Manager;

let t: TeamLead = {
	name: 'Harkirat',
	age: 20,
	department: 'DevOps',
};
