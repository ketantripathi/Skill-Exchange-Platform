import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000', {
  withCredentials: true,  // Ensure credentials are sent if needed
  transports: ['websocket', 'polling']  // Specify the transport methods to use
});

const Chat = ({ currentUserId, connectedUserId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch previous messages when component mounts or when users change
  useEffect(() => {
    const room = [currentUserId, connectedUserId].sort().join('_');
    socket.emit('joinRoom', room);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${currentUserId}/${connectedUserId}`);
        setMessages(response.data.messages || []);  // Assuming response data contains messages array
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup socket event listener on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUserId, connectedUserId]);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: currentUserId,
        receiver: connectedUserId,
        content: message,
        timestamp: new Date(),
      };

      try {
        await axios.put('http://localhost:5000/api/chat/update-chat', {
          user1: currentUserId,
          user2: connectedUserId,
          newMessage,
        });

        // Emit the message through socket for real-time updates
        socket.emit('sendMessage', newMessage);

        // Update local state to display the sent message immediately
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(''); // Clear input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="chat-container bg-gray-900 text-white rounded-lg p-6 max-w-lg">
      <div className="messages bg-gray-700 p-4 rounded-lg mb-4 h-80 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message max-w-xs px-4 py-2 rounded-lg shadow-md ${
              msg.sender === currentUserId ? 'bg-orange-500 text-white self-end' : 'bg-gray-300 text-gray-900 self-start'
            }`}
            style={{ alignSelf: msg.sender === currentUserId ? 'flex-end' : 'flex-start' }}
          >
            <p className="text-sm">{msg.content}</p>
            <small className="text-xs block mt-1 text-right opacity-80">
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <div className="input-area flex items-center mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-all transform hover:scale-105 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
