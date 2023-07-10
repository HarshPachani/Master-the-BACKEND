import express from "express";

//path module is used to specify the absolute location of the file.
import path from "path";

const port = 5000;

const app = express();

app.get("/", (req, res) => {
    const absolutePath = path.basename();
    console.log(path.join(absolutePath, "/index.html"));
});

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});