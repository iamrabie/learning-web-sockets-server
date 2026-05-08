const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/' , (req , res) => {
    res.sendFile(join(__dirname , "user-input.html"));
    console.log("directory name ::::::" , __dirname);
});


io.on("connection" , (socket) => {

    console.log("user connected");

    socket.join("room1");

    console.log("room joined" , socket.rooms);

    socket.on('send-message' , (text) => {
        console.log("message recieved ::::::::" , text);
    });
});

server.listen(8000 , () => {
    console.log("server running at http://localhost:8000");
});