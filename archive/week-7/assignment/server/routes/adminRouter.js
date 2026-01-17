const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { Admin, Course } = require("./db/index");
const { authMiddleware } = require("./middleware/auth");

const secret = process.env.JWT_SECRET; // This should be in an environment variable in a real application

// Admin routes
adminRouter.post("/signup", async (req, res) => {
    // logic to sign up admin
    try {
        const requiredInputs = z.object({
            username: z.string().min(3).max(30),
            password: z.string().mix(3).max(30),
        });

        const parsedInput = requiredInputs.safeParse(req.body);

        if (!parsedInput.success) {
            return res.status(401).json({
                message: "Incorrect inputs",
                error: parsedInput.error,
            });
        }

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
        const existingAdmin = await Admin.find({
            $where: {
                username: username,
            },
        });

        if (existingAdmin) {
            return res.status(401).json({
                message: "Admin already exists",
            });
        }

        const newAdmin = await Admin.create({
            username: username,
            password: hashedPassword,
        });

        res.status(200).json({
            message: "Admin signed up successfully",
            id: newAdmin._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.post("/login", async (req, res) => {
    // logic to log in admin
    try {
        const requiredInputs = z.object({
            username: z.string().min(3).max(20),
            password: z.string().min(3).max(30),
        });

        const parsedInputs = requiredInputs.safeParse(req.body);
        if (parsedInputs.success) {
            return res.status(401).json({
                message: "Incorrect inputs",
            });
        }

        const { username, password } = req.body;

        const admin = await Admin.find({
            $where: {
                username: username,
            },
        });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        const matchedPassword = await bcrypt.compare(password, admin.password);

        if (matchedPassword) {
            const token = jwt.sign(
                {
                    id: admin._id,
                },
                secret
            );

            res.status(200).json({
                token,
            });
        } else {
            res.status(403).json({
                message: "Incorrect credentials",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.post("/courses", authMiddleware, async (req, res) => {
    // logic to create a course
    const adminId = req.userId;

    try {
        const { title, description, price, imageLink, published } = req.body;

        const newCourse = await Course.create({
            title,
            description,
            price,
            imageLink,
            published,
            creatorId: adminId,
        });

        res.json({
            message: "Course created successfully",
            courseId: newCourse._id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.put("/courses/:courseId", authMiddleware, async (req, res) => {
    // logic to edit a course
    const adminId = req.userId;
    const courseId = req.params.courseId;

    try {
        const { title, description, price, imageLink, published } = req.body;

        const updatedCourse = await Course.updateOne(
            {
                creatorId: adminId,
                _id: courseId,
            },
            {
                title,
                description,
                price,
                imageLink,
                published,
            }
        );

        if (updatedCourse) {
            res.json({
                courseId: updatedCourse._id,
                message: "Course updated",
            });
        } else {
            res.status(401).json({
                message: "Invalid inputs",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.get("/courses", authMiddleware, async (req, res) => {
    // logic to get all courses
    const adminId = req.userId;

    try {
        const courses = await Course.find({
            creatorId: adminId,
        });

        if (courses) {
            res.json({
                courses,
            });
        } else {
            res.status(403).json({
                message: "Cannot find courses",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = {
    adminRouter,
};
