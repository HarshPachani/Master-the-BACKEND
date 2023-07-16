import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config }  from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
    path: "./data/config.env"
});

//Using middleware
app.use(express.json());
app.use(cookieParser());

//Here /users is a prefix of the url, that means in user.js we don't need to add /users for all the time, it will automatically added.
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("Nice Working");
});
