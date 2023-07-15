import express from "express";

import path from "path";

//for db operations.
import mongoose from "mongoose";

//To connect with mongoose.
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
})
 //if this function will resolve(promise resolve) then .then method will be called.
 .then(() => console.log("Database Connected"))
 //if error occur(promise reject) then it will be catched.
 .catch((e) => console.log(e));

//To Add a structure of the data into mongo.
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//to create collection (model)
const Message = mongoose.model("Message", messageSchema);


const app = express();
const port = 5000;

//for setting up view engine
app.set("view engine", "ejs");

//Using Middlewares.
//for showing static(public) folder data.
app.use(express.static(path.join(path.resolve(), "public")));

//for accessing the data submitted by user with form.
app.use(express.urlencoded({ encoded: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/success", (req, res) => {
    res.render("success");
});

app.get("/users", (req, res) => {
    res.json({
        users,
    });
});

app.get("/add", async (req, res) => {
    await Message.create({name: "Harsh", email: "Sample@gmail.com"})
    res.send("Data Added Successfully!");
})

app.post("/contact", async (req, res) => {
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.email);

    //Instead of doing this, we can use destructuring.
    // await Message.create({name: req.body.name, email: req.body.email});
    
    //This is destructuring.
    const {name, email} = req.body;
    await Message.create({name, email}); //if the key value pair are same then we don't need to declare the key.
    res.redirect("/success");
});

app.listen(port, () => {
    console.log(`The Server is working on port http://localhost:${port}`);
});