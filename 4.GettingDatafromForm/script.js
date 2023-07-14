import express from "express";

import path from "path";

const app = express();
const port = 3000;

//for setting up view engine
app.set("view engine", "ejs");

//for showing static(public) folder data.
app.use(express.static(path.join(path.resolve(), "public")));

app.get("", (req, res) => {
    res.render("index");
})
app.listen(port, () => {
    console.log(`The Server is working on port http://localhost:${port}`);
});