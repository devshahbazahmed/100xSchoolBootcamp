"use strict";
// interface User {
// 	name: string;
// 	age: number;
// }
function updateUser(updatedProps) {
    // hit the database to update the user
}
const user = {
    name: 'Shahbaz',
    age: 28,
};
// user.name = 'asdfe';
console.log(user.name);
const config = {
    endpoint: 'https://api.example.com',
    apiKey: 'abcdef123456',
};
const users = {
    abc123: { id: 'abc123', name: 'John Doe' },
    xyz789: { id: 'xyz789', name: 'Jane Doe' },
};
console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }
const users2 = new Map();
users2.set('ras@dq1', { name: 'Ras', age: 30, email: 'ras@dq1' });
users2.set('sarah@qd1', { name: 'Sarah', age: 25, email: 'sarah@dq1' });
const user3 = users2.get('ras@dq1');
console.log(user3);
const handleEvent = (event) => {
    console.log(`Handling event: ${event}`);
};
handleEvent('click'); // OK
