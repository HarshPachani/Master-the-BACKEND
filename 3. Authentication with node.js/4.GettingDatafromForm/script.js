import express from "express";

import path from "path";

//for db operations.
import mongoose from "mongoose";

//for parsing the cookie or accessing the cookies from client side.
import cookieParser from "cookie-parser";

//for accessing the id from the database.
import jwt from "jsonwebtoken";

//To connect with mongoose.
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
})
 //if this function will resolve(promise resolve) then .then method will be called.
 .then(() => console.log("Database Connected"))
 //if error occur(promise reject) then it will be catched.
 .catch((e) => console.log(e));

//To Add a structure of the data into mongo.
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//to create collection (model)
const User = mongoose.model("user", userSchema);


const app = express();
const port = 5000;

//for setting up view engine
app.set("view engine", "ejs");

//Using Middlewares.
//for showing static(public) folder data.
app.use(express.static(path.join(path.resolve(), "public")));

//for accessing the data submitted by user with form.
app.use(express.urlencoded({ encoded: true }));

//for accessing the cookie from client side.
app.use(cookieParser());


//Here next means, we can add multiple handlers in app.get() method and in "/" this path we have added this function 
//It means when the user is already authenticated then call the next hander which is (req, res)=> {} handler. and if it does not then render a login page.
const isAuthenticated = async (req, res, next) => {
    console.log(req.cookies);
    // const token = req.cookie.token;
    // or
    const { token } = req.cookies;
    if(token) {
        //The second parameter is the same key we passed to encode it.
        const decoded = jwt.verify(token, "HarshPachani");

        console.log(decoded);
        req.user = await User.findById(decoded._id);

        next();
    } 
    else {
        res.render("login");
    }
}

app.get("/", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("logout", {name: req.user.name});
});

app.get("/logout", (req, res) => {

    //to set the cookie in the browser.
    res.cookie("token", "null", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    console.log(req.body);

    const {name, email} = req.body;

    //add data into database and store id into the user variable, but we directly cannot access the id, so install npm i jasonwebtoken for it.
    const user = await User.create({name, email});

    //Here the last parameter is a secret key.
    const token = jwt.sign({_id: user._id}, "HarshPachani");
    console.log(token);
    
    //to set the cookie in the browser.
    res.cookie("token", user._id,{
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`The Server is working on port http://localhost:${port}`);
});