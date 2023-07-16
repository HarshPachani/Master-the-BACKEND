import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {

};

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({email});
    if(user) return res.status(404).json({
        success: false,
        message: "User Already Exists",
    });

    //first hash the password then send it to db.
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({name, email, password: hashedPassword});

    sendCookie(user, res, "Registered Successfully", 201);
};


export const loginUser = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if(!user) return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
    });

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
};

export const getMyProfile = (req, res) => {   
    
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logoutUser = (req, res) => {
    res.status(200).cookie("token", "", {expires: new Date(Date.now())}).json({
        success: true,
        user: req.user,
    });
}