const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    // userSchema here
    username: { type: String, required: true, unique: true },
    password: String,
    name: String,
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
});

const adminSchema = new mongoose.Schema({
    // adminSchema here
    username: { type: String, required: true, unique: true },
    password: String,
    name: String,
});

const courseSchema = new mongoose.Schema({
    // courseSchema here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    creatorId: mongoose.Schema.Types.ObjectId,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
    User,
    Admin,
    Course,
};
