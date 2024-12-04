import React, { useEffect, useState } from "react";

const ChatRoom = ({ socket, roomId, userId }) => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [newMessage, setNewMessage] = useState(""); // State to track input message

  // Listen for incoming messages and join the room on component mount
  useEffect(() => {
    // Listener for receiving messages from the server
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
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
    <div className="p-6 bg-one min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-three mb-4">
          Chat Room: {roomId}
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg h-80 overflow-y-auto mb-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong className="text-three">
                  {msg.senderId === userId ? "You" : "Artisan"}:
                </strong>{" "}
                <span>{msg.message}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet</p>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:border-three"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-three text-white rounded-r-md hover:bg-opacity-85 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
