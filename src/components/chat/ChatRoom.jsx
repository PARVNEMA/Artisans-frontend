import React, { useEffect, useState } from "react";

const ChatRoom = ({ socket, roomId, userId }) => {
	const [messages, setMessages] = useState([]); // State to store chat messages
	const [newMessage, setNewMessage] = useState(""); // State to track input message

	// Listen for incoming messages and join the room on component mount
	useEffect(() => {
		// Listener for receiving messages from the server
		socket.on("receive_message", (message) => {
			setMessages((prevMessages) => [
				...prevMessages,
				message,
			]);
		});

		// Join the chat room
		socket.emit("join_room", roomId);

		// Cleanup event listener when the component unmounts
		return () => {
			socket.off("receive_message");
		};
	}, [socket, roomId]);

	// Function to send a new message to the server
	const sendMessage = () => {
		if (newMessage.trim()) {
			// Emit a message event to the server with message details
			socket.emit("send_message", {
				roomId: roomId,
				senderId: userId,
				receiverId: "receiverId", // Update this as per your backend logic
				message: newMessage,
			});

			// Clear the input field after sending the message
			setNewMessage("");
		} else {
			// Optionally, alert the user if the input is empty
			console.log("Cannot send an empty message");
		}
	};

	return (
		<div>
			<div>
				<h2>Chat Room: {roomId}</h2>
				<div>
					{messages.length > 0 ? (
						messages.map((msg, index) => (
							<div key={index}>
								<strong>{msg.senderId}:</strong>{" "}
								{msg.message}
							</div>
						))
					) : (
						<p>No messages yet</p>
					)}
				</div>
			</div>

			<div>
				<input
					type="text"
					placeholder="Type a message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default ChatRoom;
