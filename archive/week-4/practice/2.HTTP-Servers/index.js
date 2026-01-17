const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

app.get("/todos", function (req, res) {
    res.status(200).json(todos);
});

app.get("/todos/:id", function (req, res) {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        res.status(404).json({
            message: "Todo not found",
        });
    } else {
        res.status(200).json(todo);
    }
});

app.post("/toods", function (req, res) {
    const id = parseInt(Math.floor(Math.random() * 1000000));
    const title = req.body.title;
    const newTodo = {
        id,
        title,
    };
    todos.push(newTodo);
    res.status(200).json(newTodo);
});

app.put("/todos/:id", function (req, res) {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTitle = req.body.title;
    if (todoIndex === -1) {
        res.status(404).json({
            message: "Todo not found",
        });
    } else {
        todos[todoIndex].title = newTitle;
        res.status(200).json(todos[todoIndex]);
    }
});

app.delete("/todos/:id", function (req, res) {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
        res.status(404).json({
            message: "Todo not found",
        });
    } else {
        todos.splice(todoIndex, 1);
        res.status(200).json({
            message: "Deleted the todo",
        });
    }
});

app.use(function (req, res, next) {
    res.status(404).send();
});

app.listen(3000);
