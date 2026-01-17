const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const { Todo } = require("../database/index");

// todo Routes
router.post('/', userMiddleware, async (req, res) => {
    // Implement todo creation logic
    const userId = req.userId;

    const { title, description, done } = req.body;

    try {
        const newTodo = await Todo.create({
            title,
            description,
            done,
            userId,
        });

        res.json({
            message: "Todo created successfully",
            id: newTodo._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.put('/', userMiddleware, async (req, res) => {
    // Implement update todo  logic
    const userId = req.userId;

    const { title, description, done } = req.body;

    try {
        const updatedTodo = await Todo.updateOne({
            userId: userId,
        }, {
            title: title,
            description: description,
            done: done,
        });

        res.json({
            message: "Todo updated successfully",
            id: updatedTodo._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.delete('/', userMiddleware, async (req, res) => {
    // Implement delete todo logic
    const userId = req.userId;

    try {
        await Todo.deleteMany({
            userId: userId,
        });

        res.json({
            message: "Todos deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.delete('/:id', userMiddleware, async (req, res) => {
    // Implement delete todo by id logic
    const userId = req.userId;
    const todoId = req.params.id;
    try {
        await Todo.deleteOne({
            userId: userId,
            _id: todoId,
        });

        res.json({
            message: "Todo deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.get('/', userMiddleware, async (req, res) => {
    // Implement fetching all todo logic
    const userId = req.userId;

    try {
        const todos = await Todo.find({
            userId: userId,
        });

        res.json({ todos });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get('/:id', userMiddleware, async (req, res) => {
    // Implement fetching todo by id logic
    const userId = req.userId;
    const todoId = req.params.id;
    try {
        const todo = await Todo.findOne({
            userId: userId,
            _id: todoId,
        });
        res.json({ todo });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;