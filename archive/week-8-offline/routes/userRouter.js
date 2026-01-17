const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/db");
const { JWT_USER_PASSWORD } = require("../config");
const jwt = require("jsonwebtoken");

const router = Router();

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

    await User.create({
        username,
        password,
    });

    res.json({
        message: "User created successfully",
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

    const user = await User.findOne({
        username,
        password,
    });

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);
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

router.get("/courses", async function (req, res) {
    const courses = await Course.find({});

    res.json({
        courses,
    });
});

router.post("/courses/:courseId", userMiddleware, async function (req, res) {
    const courseId = req.params.courseId;
    const username = req.body.username;
    try {
        await User.updateOne({
            username: username,
        }, {
            "$push": {
                purchasedCourses: courseId,
            }
        });
    } catch (error) {
        console.log(error);
    }

    res.json({
        message: "Course purchased successfully",
    });
});

router.get("/purchases", userMiddleware, async function (req, res) {
    const user = await User.findOne({
        username: req.headers.username,
    });

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses,
        }
    });
    res.json({
        courses,
    });
});

module.exports = router;