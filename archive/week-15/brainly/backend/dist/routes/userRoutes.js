"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const express_1 = require("express");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestInputs = zod_1.z.object({
        username: zod_1.z.email().min(3).max(30),
        password: zod_1.z.string().min(3).max(30),
    });
    const parsedRequestInputs = requestInputs.safeParse(req.body);
    if (!parsedRequestInputs.success) {
        return res.status(411).json({
            message: 'Incorrect Inputs',
        });
    }
    const { username, password } = req.body;
    try {
        const existingUser = yield db_1.User.findOne({
            username,
        });
        if (existingUser) {
            return res.status(403).json({
                message: 'User already exists',
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield db_1.User.create({
            username,
            password: hashedPassword,
        });
        if (!newUser) {
            return res.status(411).json({
                message: 'Error in inputs',
            });
        }
        res.status(201).json({
            message: 'User created successfully',
            newUser: {
                username,
            },
        });
    }
    catch (error) {
        console.log('Error in creating user', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = zod_1.z.object({
        username: zod_1.z.email().min(3).max(30),
        password: zod_1.z.string().min(3).max(30),
    });
    const parsedRequestBody = requestBody.safeParse(req.body);
    if (!parsedRequestBody.success) {
        return res.status(411).json({
            message: 'Incorrect inputs',
        });
    }
    const { username, password } = req.body;
    try {
        const user = yield db_1.User.findOne({
            username,
        });
        if (!user) {
            return res.status(403).json({
                message: 'User not found',
            });
        }
        const matchPasswrod = yield bcryptjs_1.default.compare(password, user.password);
        if (user && matchPasswrod) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString(),
            }, String(process.env.JWT_SECRET));
            res.status(200).json({
                token,
                message: 'User logged in successfully',
            });
        }
        res.status(411).json({
            message: 'Incorrect inputs',
        });
    }
    catch (error) {
        console.log('Error in logging in the user', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}));
exports.default = userRouter;
