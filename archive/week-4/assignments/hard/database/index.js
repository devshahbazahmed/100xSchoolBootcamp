const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    done: Boolean,
    userId: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
};