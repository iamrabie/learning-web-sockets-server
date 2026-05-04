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

    //   socket.broadcast.emit('hi');
    //   socket.emit('hi');

    socket.on('chat message' , (message) => {
        // console.log('MESSAGE' , message);
        // socket.emit('hi');
        // socket.broadcast.emit('chat message' , message);
        socket.emit('chat message' , message);
    });

    // socket.on('acknowledgement' , (data , callback) => {
    //     // console.log("DATA RECIEVED :::" , data);
    //     callback( null , {
    //         status:'ok'
    //     });
    // });

    socket.join("room2");

    socket.on("room1" , (room , input) => {
        console.log("room 1 message::::::" , input);
        socket.leave("room2");
        socket.join(room);
        console.log(`${room} joined, socket id : ${socket.id}`);
        io.to(room).emit('chat message' , input);
        io.except('room2').emit("chat message" , "except ROOM 2");

    });

    // io.except('room2').emit("chat message" , "except ROOM 2");


    // socket.on("room2" , (room , input) => {
    //     console.log("room 2 message::::::" , input);
    //     socket.join(room);
    //     console.log(`${room} 2  joined, socket id : ${socket.id}`);
    //     io.to(room).emit('chat message' , input);
    // });

    //catch-all listeners: it listens to any incoming event, used for debugging.
    // socket.onAny((eventName , ...params) => {
    //    console.log("EVENT NAME:::::::::" , eventName);
    //    console.log("ARGUMENTS ::::::" , params);
    // });
});


//THREE EMIT FUNCTIONS LEARNED SO FAR
//socket.emit() --> emit means send from where i am, if used on client side, it sends the message to the server and if used on the server; it sends message to the client side.
//io.emit() --> sends message to all the clients.
//socket.broadcast.emit() --> sends message to all the clients except the sender.

//INTERVIEW QUESTION: difference between HTTP request-response and WebSocket communication” (very common interview question)

// ROOM: room is an arbitrary channel that sockets can join and leave. It can be used to broadcast events to a subset of connected clients

server.listen(8000 , () => {
    console.log("server running at http://localhost:8000");
});