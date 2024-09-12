const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
  })
);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your React frontend to connect
    methods: ["GET", "POST"],
  },
});

// Handle connection event
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for incoming messages
  socket.on("sendMessage", (message) => {
    // Broadcast message to all clients
    io.emit("receiveMessage", message);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
