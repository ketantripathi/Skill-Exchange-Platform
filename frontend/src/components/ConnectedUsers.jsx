import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom';
import VideoCall from './Video';

const ConnectedUsers = ({ currentUserId }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [roomId] = useState(() => `room-${Math.random().toString(36).substr(2, 9)}`);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchConnectedUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/connection/connected-users/${currentUserId}`);
        setConnectedUsers(response.data);
      } catch (error) {
        console.error('Error fetching connected users', error);
      }
    };

    fetchConnectedUsers();
  }, [currentUserId]);

  const openChat = (user) => {
    setSelectedChatUser(user);
  };

  return (
    <div className='absolute top-0 bg-gray-600 h-screen w-full'>
      <button
        className="absolute top-4 right-4 text-white text-2xl font-bold"
        onClick={() => navigate('/')} // Navigate to the home page
      >
        &#10006;
      </button>
      <div className="bg-gray-800 shadow-md rounded-lg p-6 max-w-lg mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4 ">Connected Users</h2>
        <ul className="space-y-3">
          {connectedUsers.map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between bg-gray-200 hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg"
            >
              <span className="text-lg font-medium text-gray-800">{user.username}</span>
              <button
                onClick={() => openChat(user)}
                className="bg-orange-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
              >
                Chat
              </button>
              <button
                onClick={() => openChat(user)}
                className="bg-orange-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
              >
                Meet
              </button>
            </li>
          ))}
        </ul>

        {selectedChatUser && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg relative">
              <h3 className="text-xl font-semibold text-gray-400 mb-4">
                {selectedChatUser.username}
              </h3>
              <Chat currentUserId={currentUserId} connectedUserId={selectedChatUser._id} />
              <button
                onClick={() => setSelectedChatUser(null)}
                className="absolute top-4 right-4 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors scale-x-2"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {selectedChatUser && (<VideoCall roomId={roomId}/>)}
      </div>
    </div>
  );
};

export default ConnectedUsers;
