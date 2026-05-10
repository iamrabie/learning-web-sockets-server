const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const express = require("express");
const app = express();
const server = createServer(app);
const io = new Server(server);



app.get('/' , (req , res , next) => {
    // res.send("<h1>Hellow world!</h1>");
    res.sendFile(join(__dirname , "task.html" ));
});

io.on("connection" , (socket) => {
    console.log("user connected");

    socket.join("room-2");
    console.log("current room details ::::::::::::::" , socket.rooms);

    //user enter username and joins a room, everyone in the room gets notified.
    socket.on("join-room" , (username) => {

        socket.leave("room-2");
        socket.join("room-1");
        // console.log("current room details ::::::::::::::" , socket.rooms);
        console.log(username , "joined");
        io.to("room-1").emit("notify-all" , username);
    });
});

server.listen(8000, () => {
    console.log("app running on http://localhost:8000");
});


//ERR: cant set headers after they are sent --> when server tries to send response more than once for the same request.res.send(), res.json(), res.end(), res.sendFile();
