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

  socket.on("drawing", (data) => {
    socket.broadcast.emit("received-drawing", data);
  });

  socket.on("undo-or-clear", (type) => {
    socket.broadcast.emit("undo-or-clear", type);
  });
});

app.get("/", (req, res) => {
  res.send("Hello !");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
