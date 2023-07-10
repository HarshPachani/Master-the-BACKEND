import express from "express";
const port = 5000;

const server = express();

server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});