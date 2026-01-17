"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// create user models and schemas here
const mongoose_1 = __importDefault(require("mongoose"));
const mongodbConnectionString = 'mongodb+srv://admin:shahbaz7890@cluster0.cktkc6b.mongodb.net/brainly';
mongoose_1.default
    .connect(mongodbConnectionString)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.error('Error in connecting to DB', err));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
exports.User = mongoose_1.default.model('User', userSchema);
