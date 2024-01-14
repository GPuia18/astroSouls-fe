const http = require("http");

const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (message) => {
    console.log(message);
    io.to(message.conversation).emit("chat message receive", {
      content: message.messageText,
      sender: message.sender,
      receiver: message.receiver,
      conversation: message.conversation,
      image: message.image ? message.image : null,
    }); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("join conversation", (conversationId) => {
    console.log("A user joined the conversation " + conversationId);
    socket.join(conversationId);
  });

  socket.on("join conversations", (chatIds) => {
    console.log(
      "A user is trying to joing the following conversations: " + chatIds
    );
    chatIds.forEach((id) => {
      socket.join(id);
      console.log("A user joined conversation " + id);
    });
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
