const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User, Course } = require("./db/index");
const { authMiddleware } = require("./middleware/auth");

const secret = process.env.JWT_SECRET; // This should be in an environment variable in a real application

// User routes
userRouter.post("/signup", async (req, res) => {
    // logic to sign up user
    try {
        const requiredInputs = z.object({
            username: z.string().min(3).max(30),
            password: z.string().min(3).max(30),
        });

        const parsedInputs = requiredInputs.safeParse(req.body);

        if (!parsedInputs.success) {
            return res.status(401).json({
                message: "Invalid inputs",
            });
        }

        const { username, password } = req.body;

        const existingUser = await User.find({
            $where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(401).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await User.create({
            username: username,
            password: hashedPassword,
        });

        res.status(200).json({
            message: "User created successfully",
            id: newUser._id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.post("/login", async (req, res) => {
    // logic to log in user
    try {
        const requiredInputs = z.object({
            username: z.string().min(3).max(30),
            password: z.string().min(3).max(30),
        });

        const parsedInputs = requiredInputs.safeParse(req.body);

        if (!parsedInputs.success) {
            return res.status(401).json({
                message: "Incorrect inputs",
            });
        }

        const { username, password } = req.body;

        const user = await User.find({
            $where: {
                username: username,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);

        if (matchedPassword) {
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret
            );

            res.status(200).json({
                token,
            });
        } else {
            res.status(403).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.get("/courses", async (req, res) => {
    // logic to list all courses
    try {
        const courses = await Course.find({});
        res.json({
            courses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.post("/courses/:courseId", authMiddleware, async (req, res) => {
    // logic to purchase a course
    const courseId = req.params.courseId;
    const userId = req.userId;
    try {
        await User.updateOne(
            {
                _id: userId,
            },
            {
                $push: {
                    purchasedCourses: courseId,
                },
            }
        );

        res.json({
            message: "Course purchased successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.get("/purchasedCourses", authMiddleware, async (req, res) => {
    // logic to view purchased courses
    try {
        const userId = req.userId;
        const user = await User.findOne({
            _id: userId,
        });

        const courses = await Course.find({
            _id: {
                $in: user.purchasedCourses,
            },
        });
        res.json({
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = {
    userRouter,
};
