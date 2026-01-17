const express = require("express");
const app = express();
const fs = require("fs");
const pathName = "todos.json";
const port = 3000;

app.use(express.json());

function findIndex(arr, id) {
    for (let i = 0; i, arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

function removeAtIndex(arr, id) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== id) newArray.push(arr[i]);
    }
    return newArray;
}

app.get("/todos", function (req, res) {
    fs.readFile(pathName, "utf-8", function (err, data) {
        if (err) throw new Error("Error in finding the file", err);
        const todos = JSON.parse(data);
        res.status(200).json(todos);
    });
});

app.get("/todos/:id", function (req, res) {
    const id = parseInt(req.params.id);
    fs.readFile(pathName, "utf-8", function (err, data) {
        if (err) throw new Error("Error in finding the file", err);
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, id);
        if (todoIndex === -1) {
            res.status(404).json({
                message: "Todo not found",
            });
        } else {
            const todo = todos[todoIndex];
            res.status(200).json(todo);
        }
    });
});

app.post("/todos", function (req, res) {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
    };
    fs.readFile(pathName, "utf-8", function (err, data) {
        if (err) throw new Error("Error in finding the file", err);
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile(pathName, JSON.stringify(todos), function (err) {
            if (err) throw new Error("Error in finding the file", err);
            res.status(200).json(todos);
        });
    });
});

app.put("/todos/:id", function (req, res) {
    const id = parseInt(req.params.id);
    const newTitle = req.body.title;
    fs.readFile(pathName, "utf-8", function (err, data) {
        if (err) throw new Error("Error in finding the file", err);
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, id);
        if (todoIndex === -1) {
            res.status(404).json({
                message: "Todo not found",
            });
        } else {
            const updatedTodo = {
                id,
                title: newTitle,
            };
            todos[todoIndex] = updatedTodo;
            fs.writeFile(pathName, JSON.stringify(todos), function (err) {
                if (err) throw new Error("Error in finding the file", err);
                res.status(200).json(updatedTodo);
            });
        }
    });
});

app.delete("/todos/:id", function (req, res) {
    const id = parseInt(req.params.id);
    fs.readFile(pathName, "utf-8", function (err, data) {
        if (err) throw new Error("Error in finding the file", err);
        let todos = JSON.parse(data);
        const todoIndex = findIndex(todos, id);
        if (todoIndex === -1) {
            res.status(404).json({
                message: "Todo not found",
            });
        } else {
            todos = removeAtIndex(todos, todoIndex);
            fs.writeFile(pathName, JSON.stringify(todos), function (err) {
                if (err) throw new Error("Error in finding the file", err);
                res.status(200).json(todos);
            });
        }
    });
});

app.use(function (req, res, next) {
    res.status(404).send();
});

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});
