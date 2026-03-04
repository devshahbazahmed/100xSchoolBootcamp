const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

app.post("/create-todo", (req, res) => {
  const { title, description } = req.body;
  const todoId = Date.now();

  if (!title || !description) {
    throw new Error("Please add valid title or description");
  }

  todos.push({
    id: todoId,
    title,
    description,
  });

  res.status(201).json({
    id: todoId,
    message: "Todo created successfully",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    todos,
  });
});

app.delete("/delete-todo", (req, res) => {
  const todoId = req.body.id;

  if (!todoId) {
    throw new Error("Please enter a valid todo ID");
  }

  todos.splice(todoId, 1);

  res.status(200).json({
    id: todoId,
    message: "Todo deleted successfully",
  });
});

app.put("/update-todo", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;

  if (!todoId) {
    throw new Error("Please enter a valid todo ID");
  }

  let updateTodo = todos.find((todo) => todo.id === todoId);

  if (!updateTodo) {
    throw new Error("Todo not found");
  }

  if (updatedTitle !== undefined) updateTodo.title = updatedTitle;
  if (updatedDescription !== undefined)
    updateTodo.description = updatedDescription;

  res.status(200).json({
    message: "Todo updated successfully",
    updateTodo,
  });
});

app.listen(3000);
