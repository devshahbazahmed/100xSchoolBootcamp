require("dotenv").config;
const express = require("express");

const app = express();

const port = 3000;

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(port, function () {
    console.log(`Server started running on port ${port}`);
});