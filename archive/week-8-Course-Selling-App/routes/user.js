const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { UserModel, PurchasesModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const requestBody = z.object({
        email: z.string().email().min(3).max(50),
        password: z.string().min(3).max(20),
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
    });

    const parsedInputBody = requestBody.safeParse(req.body);

    if (!parsedInputBody.success) {
        res.status(401).json({
            message: "Incorrect inputs",
        });
    }

    const { email, password, firstName, lastName } = req.body;
    try {
        const hasedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            email,
            password: hasedPassword,
            firstName,
            lastName,
        });

        res.json({
            message: "You have signed up",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal sever error",
        });
    }
});

userRouter.post("/signin", async function (req, res) {
    const requestBody = z.object({
        email: z.string().email().min(3).max(50),
        password: z.string().min(3).max(20),
    });

    const parsedBodyData = requestBody.safeParse(req.body);

    if (!parsedBodyData.success) {
        res.status(401).json({
            message: "Invalid inputs",
        });
    }

    const { email, password } = req.body;
    try {
        const foundUser = await UserModel.findOne({
            email: email,
        });

        if (!foundUser) {
            res.status(403).json({
                message: "User not found",
            });
        }
        const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (foundUser && passwordMatch) {
            const token = jwt.sign(
                {
                    id: foundUser._id.toString(),
                },
                JWT_USER_PASSWORD
            );

            res.json({
                token,
                message: "Logged in successfully",
            });
        } else {
            res.status(403).json({
                message: "Check your inputs first",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.get("/purchases", userMiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await PurchasesModel.find({
        userId: userId,
    });

    const coursesData = await CourseModel.find({
        _id: { $in: purchases.map((course) => course.courseId) },
    });

    res.json({
        purchases,
        coursesData,
    });
});

module.exports = {
    userRouter: userRouter,
};
