const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullName: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
});

const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullName: String,
});

const User = mongoose.model("user", UserSchema);
const Course = mongoose.model("courses", CourseSchema);
const Admin = mongoose.model("admin", AdminSchema);

module.exports = {
    User,
    Course,
    Admin,
};