const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
    const requiredBody = z.object({
        email: z.string().email().min(3).max(50),
        password: z.string().min(3).max(20),
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
    });

    const parsedInputData = requiredBody.safeParse(req.body);

    if (!parsedInputData.success) {
        res.status(403).json({
            message: "Please verify your inputs",
        });
    }

    const { email, password, firstName, lastName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await AdminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.json({
            message: "You have signed up successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.post("/signin", async function (req, res) {
    const requestBody = z.object({
        email: z.string().email().min(3).max(50),
        password: z.string().min(3).max(20),
    });

    const parsedInputData = requestBody.safeParse(req.body);

    if (!parsedInputData.success) {
        res.status(401).json({
            message: "Please check your inputs",
        });
    }

    const { email, password } = req.body;

    try {
        const foundAdmin = await AdminModel.findOne({
            email: email,
        });

        const passwordMatch = await bcrypt.compare(
            password,
            foundAdmin.password
        );

        if (foundAdmin && passwordMatch) {
            const token = jwt.sign(
                {
                    id: foundAdmin._id,
                },
                JWT_ADMIN_PASSWORD
            );

            res.json({
                message: "Logged in successfully",
                token,
            });
        } else {
            res.status(401).json({
                message: "Incorrect inputs",
            });
        }
    } catch (error) {
        req.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const { title, description, price, imageUrl } = req.body;

    try {
        // creating a web3 saas in 6 hours for uploading directly image
        const course = await CourseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId: adminId,
        });

        res.json({
            message: "Course created",
            courseId: course._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const { title, description, price, imageUrl, courseId } = req.body;

    try {
        const updatedCourse = await CourseModel.updateOne(
            {
                _id: courseId,
                creatorId: adminId,
            },
            {
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl,
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
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    try {
        const courses = await CourseModel.find({
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
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

adminRouter.delete("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const courseId = req.body.courseId;

    try {
        const deleteCourse = await CourseModel.deleteOne({
            _id: courseId,
            creatorId: adminId,
        });

        res.json({
            message: "Deleted the course",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = {
    adminRouter: adminRouter,
};
