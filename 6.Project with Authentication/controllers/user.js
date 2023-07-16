import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    const keyword = req.query.keyword;
    console.log(keyword);
    
    res.json({
        success: true,
        users,
    })
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const users = await User.create({
        name, email, password
    });

    //201 status code is use for create.
    res.status(201).json({
        success: true,
        message: "Registered Successfully",
    });
};

export const specialFunc = (req, res) => {
    res.json({
        success: true,
        message: "Just Joking",
    });
};

//This is dynamic URL where first userid is same but next will consider as an id in this case.
// userid/asdf
// userid/harsh
//NOTE: always keep dynamic route at last.
export const getUserDetails = async (req, res) => {
    // const { id } = req.query;

    const { id } = req.params;

    const user = await User.findById(id);

    console.log(req.params);
    res.json({
        success: true,
        user,
    });
};

export const putUserDetails = async(req, res) => {
    res.json({
        success: true,
        message: "User Updated Successfully",
    });
}

export const deleteUserDetails = async(req, res) => {
    res.json({
        success: true,
        message: "User Deleted Successfully",
    });
}