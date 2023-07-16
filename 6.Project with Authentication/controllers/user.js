import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {

};

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    const User = await User.findOne({email});
    if(User) return res.status(404).json({
        success: false,
        message: "User Already Exists",
    });

    //first hash the password then send it to db.
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({name, email, password: hashedPassword});

    const token = jwt.sign({_id: User._id}, process.env.JWT_SECRET);

    res.status(201).cookie("token", token, {
        httpOnly: true,        
        maxAge: 15 * 60 * 1000, //expiry time = 15 minutes. 15 * minutes * second(1) 
    }).json({
        success: true,
        message: "Registered Successfully!",
    });
};

export const getUserDetails = async (req, res) => {
    
};

export const loginUser = async(req, res, next) => {

};