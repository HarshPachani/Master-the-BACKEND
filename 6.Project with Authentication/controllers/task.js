import { Task } from "../models/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const newTask = async (req, res, next) => {
    const {title, description} = req.body;
    await Task.create({
        title,
        description,
        user: req.user
    });

    res.status(201).json({
        success: true,
        message: "Task added successfully",
    });
};