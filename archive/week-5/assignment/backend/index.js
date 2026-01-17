const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});

