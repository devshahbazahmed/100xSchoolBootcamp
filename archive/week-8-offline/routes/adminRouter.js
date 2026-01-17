const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

router.post("/signup", async function (req, res) {
    const requiredBodyData = z.object({
        username: z.string().min(3).max(30),
        password: z.string().min(3).max(20),
    });

    const parsedInputData = requiredBodyData.safeParse(req.body);

    if (!parsedInputData.success) {
        res.status(401).json({
            message: "Please check your inputs",
        });
    }

    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password,
    });

    res.json({
        message: "Admin created successfully",
    });
});

router.post("/signin", async function (req, res) {
    const requiredBodyData = z.object({
        username: z.string().min(3).max(30),
        password: z.string().min(3).max(20),
    });

    const parsedInputData = requiredBodyData.safeParse(req.body);

    if (!parsedInputData.success) {
        res.status(401).json({
            message: "Please check your inputs",
        });
    }

    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username,
        password,
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id,
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token,
        });
    } else {
        res.status(411).json({
            message: "Incorrect email and password",
        });
    }
});

router.post("/courses", adminMiddleware, async function (req, res) {
    const requiredBodyData = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string(),
    });

    const parsedInputData = requiredBodyData.safeParse(req.body);

    if (!parsedInputData.success) {
        res.status(401).json({
            message: "Please check your inputs",
        });
    }
    const { title, description, price, imageUrl } = req.body;

    const course = await Course.create({
        title,
        description,
        price,
        imageUrl,
    });

    res.json({
        message: "Course created successfully",
        courseId: course._id,
    });
});

router.get("/courses", adminMiddleware, async function (req, res) {
    const courses = await Course.find({});

    res.json({
        courses,
    });
});

module.exports = router;