import express from "express";
import mongoose from "mongoose";

const app = express();

//Using middleware
app.use(express.json());

//database connection
mongoose
    .connect("mongodb://127.0.0.1:27017", {
        dbName: "backendapi",
    })
    .then(() => console.log("Database Connected!"))
    .catch(() => console.log(e));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", schema);

app.get("/", (req, res) => {
    res.send("Nice Working");
});

app.get("/users/all", async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        users,
    })
});

//This is dynamic URL where first userid is same but next will consider as an id in this case.
// userid/asdf
// userid/harsh

//NOTE: always keep dynamic route at last.

app.get("/userid/:id", async (req, res) => {
    // const { id } = req.query;

    const { id } = req.params;

    const user = await User.findById(id);

    console.log(req.params);
    res.json({
        success: true,
        user,
    });
})

app.post("/users/new", async (req, res) => {
    const { name, email, password } = req.body;

    const users = await User.create({
        name, email, password
    });

    //201 status code is use for create.
    res.status(201).json({
        success: true,
        message: "Registered Successfully",
    });
});

app.listen(5000, () => {
    console.log("Server is working");
})