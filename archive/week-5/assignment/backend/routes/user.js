const { Router } = require("express");
const { z } = require("zod");
const { User } = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const requiredInputs = z.object({
        username: z.string().email().min(3).max(30),
        password: z.string().min(3).max(30),
    });

    const parsedInputs = requiredInputs.safeParse(req.body);

    if (!parsedInputs.success) {
        return res.status(411).json({
            message: "Please enter valid inputs",
        });
    }

    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.findOne({
            username: username,
        });

        if (user) {
            return res.status(411).json({
                message: "User already exists with this username",
            });
        }

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        res.json({
            message: "User signed up successfully",
            userId: newUser._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const requiredInputs = z.object({
        username: z.string().email().min(3).max(30),
        password: z.string().min(3).max(30),
    });

    const parsedInputs = requiredInputs.safeParse(req.body);

    if (!parsedInputs.success) {
        return res.status(411).json({
            message: "Please enter valid inputs",
        });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            username: username,
        });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (user && passwordMatch) {
            const token = jwt.sign({
                id: user._id,
            }, JWT_PASSWORD);

            res.json({
                token,
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = {
    userRouter,
};