// interface User {
// 	name: string;
// 	age: number;
// }

// function sumOfAge(user1: User, user2: User) {
// 	return user1.age + user2.age;
// }

// const age = sumOfAge({ name: 'Taro', age: 20 }, { name: 'Jiro', age: 30 });
// console.log(age);

interface User {
	id: string;
	name: string;
	age: number;
	email: string;
	password: string;
}

// Pick:
type UpdatedProps = Pick<User, 'name' | 'email' | 'password'>;

// Partial:
type UpdatedPropsPartial = Partial<UpdatedProps>;

function updateUser(updatedProps: UpdatedPropsPartial) {
	// hit the database to update the user
}

// Readonly:
type User2 = {
	// readonly name: string;
	// readonly age: number;
	name: string;
	age: number;
};

const user: Readonly<User2> = {
	name: 'Shahbaz',
	age: 28,
};

// user.name = 'asdfe';

console.log(user.name);

interface Config {
	readonly endpoint: string;
	readonly apiKey: string;
}

const config: Readonly<Config> = {
	endpoint: 'https://api.example.com',
	apiKey: 'abcdef123456',
};

// config.apiKey = 'newkey';
// Error: Cannot assign to 'apiKey' because it is a read-only property.

// Record and Map:
// interface User3 {
// 	id: string;
// 	name: string;
// }

// type Users = { [key: string]: User3 };

// const users: Users = {
// 	abc123: { id: 'abc123', name: 'John Doe' },
// 	xyz789: { id: 'xyz789', name: 'Jane Doe' },
// };

// Record:
interface User3 {
	id: string;
	name: string;
}

type Users = Record<string, User3>;

const users: Users = {
	abc123: { id: 'abc123', name: 'John Doe' },
	xyz789: { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }

// Map:

type User4 = {
	name: string;
	age: number;
	email: string;
};

const users2 = new Map<string, User4>();
users2.set('ras@dq1', { name: 'Ras', age: 30, email: 'ras@dq1' });
users2.set('sarah@qd1', { name: 'Sarah', age: 25, email: 'sarah@dq1' });

const user3 = users2.get('ras@dq1');
console.log(user3);

// Exclude:
type NewEvent = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<NewEvent, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
	console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK
