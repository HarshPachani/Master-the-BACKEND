import express from "express";

import path from "path";

const app = express();
const port = 5000;

const users = [];

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
})

app.post("/contact", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.email);
    users.push({username: req.body.name, email: req.body.email});

    res.redirect("/success");
});

app.listen(port, () => {
    console.log(`The Server is working on port http://localhost:${port}`);
});