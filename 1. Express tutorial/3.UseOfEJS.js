import express from "express";

//path module is used to specify the absolute location of the file.
import path from "path";

const port = 5000;

const app = express();

//for setting up view engine
app.set("view engine", "ejs");

//for showing static(public) folder data.
app.use(express.static(path.join(path.resolve(), "public")));


app.get("/", (req, res) => {
    res.render("index", {name: "Harsh Pachani"});
});

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});