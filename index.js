const express = require("express");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);

app.get('/' , (req , res) => {
    res.send("<h2>Hellow World</h2>");
});


server.listen(8000 , () => {
    console.log("server running at https://localhost:8000");
});