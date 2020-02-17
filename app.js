const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

const room = 'testRoom';


io.on("connection", socket => {

  socket.join(room);

  const handleMessage = (data) => {
    io.in(room).emit("message", data); 
    return true;
  };

  console.log("New client connected");
  socket.emit("connect", "");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on('message', (data) => {
    handleMessage(data);
    console.log("message received: ", data);
  });

});

server.listen(port, () => console.log(`Listening on port ${port}`));