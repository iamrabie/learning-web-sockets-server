const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server , {
    connectionStateRecovery:{}
});


app.get('/' , (req , res , next) => {
   res.sendFile(join(__dirname , "connection-state-recovery.html"));
});


io.on("connection" , (socket) => {
    // console.log("user connected");

    socket.on("disconnect" , (reason) => {
      console.log("user disconnected" , reason);
    });


    socket.on("send-message" , (text) => {
        // console.log("message recieved is :::::::::::" , text);
        io.emit("messages" , text);
    });

});

server.listen(8000 , () => {
    console.log("server running at http://localhost:8000");
});