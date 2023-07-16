import express from "express";
import userRouter from "./routes/user.js";
import { config }  from "dotenv";

export const app = express();

config({
    path: "./data/config.env"
});
//Using middleware
app.use(express.json());

//Here /users is a prefix of the url, that means in user.js we don't need to add /users for all the time, it will automatically added.
app.use("/users", userRouter);


app.get("/", (req, res) => {
    res.send("Nice Working");
});
