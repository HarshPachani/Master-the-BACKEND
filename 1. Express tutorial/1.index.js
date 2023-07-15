// const http = require("http"); //This is an old way of exporting.
//to change to the new way, we need to add 'type': 'module' into package.json, after it
import http from "http";

const server = http.createServer((req, res) => {
    if(req.url === "/")
        res.end("<h1>Home Page</h1>");
    
    else if(req.url === "/contact")
        res.end("<h1>Contact Page</h1>");
        
    else if(req.url === "/about")
        res.end("<h1>About Page</h1>");
    
    else {
        res.end("<h1>Page not found!</h1>");
    }
});

server.listen(5000, () => {
    console.log("Server Started!");
});

//This is pure node js, but it doesn't provide code efficiency and readability
//also overhead for routing the end points.
//for that we have express.js
