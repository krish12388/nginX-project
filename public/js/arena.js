const socket = io();
const chess = new Chess();

socket.on("connect", () => {
  socket.emit("join-room", "room1");
  console.log("Connected to server via Socket.io");
});
