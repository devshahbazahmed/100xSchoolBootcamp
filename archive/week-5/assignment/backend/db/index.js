const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

const TodoSchema = new mongoose.Schema({
    title: String,
    done: { type: Boolean, default: false },
    userId: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model("users", UserSchema);
const Todo = mongoose.model("todos", TodoSchema);

module.exports = {
    User,
    Todo,
};