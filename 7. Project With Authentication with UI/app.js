import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();
const port = 5000;

config({
    path: "./data/config.env"
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Nice Work");
});

app.use(errorMiddleware);