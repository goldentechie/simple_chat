const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(express.static("public"));

io.on("connection", (socket) => {
  // ...
  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
  socket.on('data', (data)=>{
    console.log(data);
    io.local.emit('data',data);
  }) 
});

httpServer.listen(3000);