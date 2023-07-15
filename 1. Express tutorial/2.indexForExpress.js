import express from "express";

//path module is used to specify the absolute location of the file.
import path from "path";

const port = 5000;

const app = express();

app.get("/", (req, res) => {
    console.log(path.resolve()); //path.resolve() will return the current directory where the file is saved.
    const pathlocation = path.resolve();
    // console.log(path.join(pathlocation, "./index.html")); //path.join() will join the first parameterized with second's name in the end.
    res.sendFile(path.join(pathlocation, "./index.html"));
});

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});