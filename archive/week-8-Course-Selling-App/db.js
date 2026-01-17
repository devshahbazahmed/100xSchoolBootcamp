const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const Admin = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
});

const Purchases = new Schema({
    courseId: ObjectId,
    userId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("course", Course);
const PurchasesModel = mongoose.model("purchases", Purchases);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel,
};
