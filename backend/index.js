import http from "http";
import { info } from "./utils/logger.js";
import { PORT } from "./utils/config.js";
import { Server } from "socket.io"; // Import socket.io server

import app from "./app.js";

const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust the origin as per your frontend URL
    methods: ["GET", "POST"],
  },
});

// Set up Socket.IO connection event
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT || 3001, () => {
  info(`Server running on port ${PORT}`);
});
