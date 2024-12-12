import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatPage = ({ roomId, userId, artisanId, productId }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Initialize Socket.IO connection
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);

        // Join the room
        newSocket.emit("join_room", roomId);

        // Listen for incoming messages
        newSocket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Cleanup on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    const sendMessage = async () => {
        if (!message.trim() && !image) return;

        let imageBase64 = null;
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageBase64 = reader.result;
                const data = {
                    roomId,
                    senderId: userId,
                    receiverId: artisanId,
                    message,
                    image: imageBase64, // Attach base64 image
                    productId,
                    timestamp: new Date(),
                };

                socket.emit("send_message", data);
                setMessages((prevMessages) => [...prevMessages, data]);
                setMessage("");
                setImage(null); // Reset image
            };
            reader.readAsDataURL(image);
        } else {
            const data = {
                roomId,
                senderId: userId,
                receiverId: artisanId,
                message,
                productId,
                timestamp: new Date(),
            };

            socket.emit("send_message", data);
            setMessages((prevMessages) => [...prevMessages, data]);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="bg-three text-white p-4 text-center font-bold">
                Chat Room
            </div>

            {/* Message Display */}
            <div className="bg-gray-100 p-4 rounded-lg h-80 overflow-y-auto mb-4 flex-grow">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message mb-2 p-2 rounded ${
                                msg.senderId === userId
                                    ? "bg-three text-white text-right"
                                    : "bg-four text-three text-left"
                            }`}
                        >
                            <span>{msg.message}</span>
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="Sent"
                                    className="mt-2 rounded max-h-40"
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet</p>
                )}
            </div>

            {/* Input Section */}
            <div className="flex mt-4">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:border-three"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])} // Handle image input
                    className="ml-2"
                />
                <button
                    onClick={sendMessage}
                    className="px-6 py-2 bg-three text-white rounded-r-md hover:bg-opacity-85 transition duration-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
