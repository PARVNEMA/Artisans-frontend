import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:8000/"); // Replace with your backend URL

const ChatPage = () => {
   const { roomId } = useParams(); // Extract roomId from the URL
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState("");

   useEffect(() => {
      // Join the chat room
      socket.emit("join_room", '4');

      // Load previous messages
      socket.on("load_previous_messages", (loadedMessages) => {
         setMessages(loadedMessages);
         useEffect();
      });

      // Receive new messages
      socket.on("receive_message", (newMessage) => {
         setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Cleanup on component unmount
      return () => {
         socket.disconnect();
      };
   }, [roomId]);

   const sendMessage = () => {
      const data = {
         roomId: 4,
         senderId: "1", // Replace with sender logic
         receiverId: "2", // Replace with receiver logic
         message,
         timestamp: new Date(),
      };

      socket.emit("send_message", data);
      setMessages((prevMessages) => [...prevMessages, data]); // Add sent message to local state
      setMessage(""); // Clear input after sending
   };

   return (
      <div className="chat-container">
         <div className="chat-header">Chat Room</div>
         <div className="chat-messages">
            {messages.map((msg, index) => (
               <div
                  key={index}
                  className={`message ${
                     msg.senderId === "1" ? "sent" : "received"
                  }`}
               >
                  <span>{msg.message}</span>
               </div>
            ))}
         </div>
         <div className="chat-input-container">
            <input
               type="text"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Type a message"
               className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">
               Send
            </button>
         </div>
      </div>
   );
};

export default ChatPage;
