import { io } from "socket.io-client";

// Connect to the Socket.IO server
const socket = io("http://localhost:8000", {
	transports: ["websocket"], // ensures that websocket transport is used
});

// Join a chat room
socket.emit("join_room", "1");

// Listen for new messages
socket.on("receive_message", (message) => {
	console.log("New message:", message);
});

// Send a new message
const sendMessage = (message) => {
	socket.emit("send_message", {
		roomId: "1",
		senderId: "user123",
		receiverId: "user456",
		message: message,
	});
};

export default socket;
