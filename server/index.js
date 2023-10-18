const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 4000;
app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);

  socket.on("create-room", ({ roomId, userName }) => {
    socket.join(roomId);
    socket
      .to(roomId)
      .emit("user-joined", { userName: userName, id: Math.random() });
  });

  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);
  });

  socket.on("drawing", ({ roomId, userName, path }) => {
    socket
      .to(roomId)
      .emit("received-drawing", { userName: userName, path: path });
  });

  socket.on("undo-or-clear", ({ type, roomId, userName }) => {
    socket.to(roomId).emit("undo-or-clear", { type: type, userName: userName });
  });

  socket.on("change-bg-color", ({ bgColor, roomId, userName }) => {
    socket
      .to(roomId)
      .emit("received-bg-color", { color: bgColor, userName: userName });
  });
  socket.on("change-bg-image", ({ bgImageUrl, roomId, userName }) => {
    socket
      .to(roomId)
      .emit("received-bg-url", { url: bgImageUrl, userName: userName });
  });
});

app.get("/", (req, res) => {
  res.send("Hello !");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
