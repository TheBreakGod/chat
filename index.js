const express = require("express");
const http = require("http");
const { connect } = require("http2");
const socketIO = require("socket.io"); 

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 4500;

app.use(express.static(__dirname + "/public"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

// io.on("connect", (socket) => {
//     console.log("User connected");
//     socket.on("chat message", (msg) => {
//         io.emit("chat message", msg);
//     })

//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     })
// })

io.on("connect", (socket) => {
    socket.on('newUser', (name) => {
        let newUser = name;
        console.log(`${newUser} connected`);

        socket.on('disconnect', () => {
            console.log('User disconnected');
            io.emit('disconnect', `${newUser} disconnected`);
        })

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})