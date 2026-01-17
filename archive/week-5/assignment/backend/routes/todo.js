const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { Todo } = require("../db/index");
const todoRouter = Router();

appendFile.use(userMiddleware);

todoRouter.post("/", async (req, res) => {
    try {
        const { title, done } = req.body;
        const userId = req.userId;

        const newTodo = await Todo.create({
            title,
            done,
            userId,
        });

        res.json({
            message: "Todo added successfully",
            todoId: newTodo._id,
        });
    } catch (error) {
        req.status(500).json({
            message: "Internal server error",
        });
    }
});

todoRouter.put("/", async (req, res) => {
    try {
        const { id } = req.params;
        const updatePayload = req.body;

        // Basic input check
        if (typeof updatePayload.completed === 'undefined') {
            return res.status(400).json({
                msg: "You must provide a completed status.",
            });
        }


        const result = await Todo.updateOne(
            { _id: id },
            { completed: updatePayload.completed }
        );

        res.json({
            msg: "Todo marked as completed.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

todoRouter.get("/", async (req, res) => {
    try {
        const userId = req.userId;
        const todos = await Todo.find({
            userId: userId,
        });

        if (!todos) {
            res.status(404).json({
                message: "No todos found",
            });
        }

        res.json({
            todos,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});


module.exports = {
    todoRouter,
};