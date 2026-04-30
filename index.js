const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/' , (req , res) => {

    res.sendFile(join(__dirname , 'index.html'));
    // res.send("<h2>Hellow World</h2>");
    // console.log("CURRENT DIRECTORY ::::::" , __dirname); GETS THE CURRENT DIRECTORY
});


//It is a predefined event that Socket.io automatically emits, It fires when a client successfully connects to the server. isolated per client connection,Socket.io creates a separate socket object for each user.
io.on('connection' , (socket) => {
    console.log('a user connected');
});


server.listen(8000 , () => {
    console.log("server running at http://localhost:8000");
});