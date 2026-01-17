let todos = []; // in memory space

export async function getAllTodo(req, res, next) {
    //  write here
    res.json({
        todos,
    });
}

export async function createTodo(req, res, next) {
    //  write here
    const title = req.body.title;

    const newTodo = todos.push({
        id: Math.floor(Math.random() * 10000000),
        title: title,
    });

    if (!newTodo) {
        res.status(411).json({
            message: "Invalid todo",
        });
    }

    res.json({
        id: newTodo.id,
    });
}

export async function updateTodo(req, res, next) {
    //  write here
    const updatedTitle = req.body.title;
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        res.status(400).json({
            message: "Todo not found",
        });
    } else {
        todos[todoIndex].title = updatedTitle;
        res.json({
            message: "Todo updated successfully",
        });
    }
}

export async function searchTodo(req, res, next) {
    //  write here
    const q = req.query.q;

    if (!q) {
        return res.status(400).json({
            message: "Query parameter missing",
        });
    }

    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(q.toLowerCase()));

    res.json({
        filteredTodos,
    });
}

export async function deleteTodoById(req, res, next) {
    //  write here
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        res.status(411).json({
            message: "Todo not found",
        });
    } else {
        todos.splice(todoIndex, 1);
        res.json({
            message: "Todo deleted successfully",
        });
    }
}