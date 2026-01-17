const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { z } = require("zod");
const { User, Todo } = require("../database/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const requiredInputs = z.object({
        email: z.string().email().min(3).max(30),
        password: z.string().min(3).max(20),
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
    });

    const parsedInputs = requiredInputs.safeParse(req.body);

    if (!parsedInputs.success) {
        return res.status(401).json({
            message: "Please check your inputs",
        });
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await User.create({
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

router.post('/login', async (req, res) => {
    // Implement user login logic
    const requiredInputs = z.object({
        email: z.string().email().min(3).max(30),
        password: z.string().min(3).max(20),
    });

    const parsedInputs = requiredInputs.safeParse(req.body);

    if (!parsedInputs.success) {
        return res.status(401).json({
            message: "Please check your inputs",
        });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email: email,
        });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (user && passwordMatch) {
            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_PASSWORD);

            res.json({
                token,
            });
        } else {
            res.status(411).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
const blackList = new Set();

router.get('/todos', userMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user
    const userId = req.userId;
    const todos = await Todo.find({
        userId: userId,
    });

    res.json({
        todos,
    });

});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    const userId = req.userId;
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: "No token provided" });
    const blackListKey = `${userId}: ${token}`;
    blackList.add(blackListKey);
    res.json({
        message: "Logged out successfully",
    });
});

module.exports = router;