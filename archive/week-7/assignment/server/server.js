//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/userRouter");
const { adminRouter } = require("./routes/adminRouter");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(port, () => {
    console.log("Server is listening on port 3000");
});
