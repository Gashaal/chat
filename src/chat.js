const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origins: "*:*"
  }
});

const PORT = process.env.PORT || "3001";
const MAX_MESSAGES_NUMBER = 5;
const messages = [];

io.on("connection", socket => {
  let addedUser = false;
  socket.emit("history", { messages });

  function getMessage(text, type) {
    const message = { username: socket.username, text, type };
    if (messages.length >= MAX_MESSAGES_NUMBER) {
      messages.splice(0, 1);
    }
    messages.push(message);

    return message;
  }

  socket.on("add user", username => {
    if (addedUser) return;

    socket.username = username;
    addedUser = true;

    socket.broadcast.emit(
      "user joined",
      getMessage(`${socket.username} joined`, "info")
    );
  });

  socket.on("new message", text => {
    socket.broadcast.emit("new message", getMessage(text, "user"));
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      socket.broadcast.emit(
        "user left",
        getMessage(`${socket.username} left`, "info")
      );
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
