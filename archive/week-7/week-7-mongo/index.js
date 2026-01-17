const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware, JWT_SECRET } = require("./auth.js");
const { z } = require("zod");

const app = express();

app.use(express.json());

app.post("/signup", async function (req, res) {
    try {
        const requiredBody = z.object({
            username: z.string().email(),
            password: z
                .string()
                .min(8, {
                    message: "Password must be atleast 8 characters long ",
                })
                .max(20, {
                    message: "Password must be at most 20 characters long",
                })
                .refine((password) => /A-Z/.test(password), {
                    message:
                        "Password must contain at least one uppercase letter",
                })
                .refine((password) => /a-z/.test(password), {
                    message:
                        "Password must contain atleast one lowercase letter",
                })
                .refine((password) => /[0-9]/.test(password), {
                    message: "Password must contain at least one number",
                })
                .refine((password) => /[!@#$%^&*]/.test(password), {
                    message:
                        "Password must contain at least one special character",
                }),
            name: z.string(),
        });
        // const parsedData = requiredBody.parse(req.body);
        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedDataWithSuccess.success) {
            res.json({
                message: "Incorrect Format",
                error: parsedDataWithSuccess.error,
            });
            return;
        }

        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;

        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        await UserModel.create({
            username: username,
            password: hashedPassword,
            name: name,
        });
        res.json({
            messsage: "You have signed up",
        });
    } catch (error) {
        res.json({
            message: "User already exists",
        });
    }
});

app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username: username,
    });

    if (!user) {
        res.status(403).json({
            message: "User does not exist in our database",
        });
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign(
            {
                id: user._id.toString(),
            },
            JWT_SECRET
        );
        res.json({
            token,
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials",
        });
    }
});

app.post("/todo", authMiddleware, async function (req, res) {
    const title = req.body.title;
    const done = req.body.done;
    const userId = req.userId;

    await TodoModel.create({
        title: title,
        done: done,
        userId: userId,
    });

    res.json({
        message: "Todo added",
    });
});

app.get("/todos", authMiddleware, async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId: userId,
    });

    res.json({
        todos,
    });
});

app.listen(3000);
