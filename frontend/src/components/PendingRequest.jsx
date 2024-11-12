import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AcceptRejectRequestButton from './ReceiveRequest'; 
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/usericon.png'; // Assuming you want to use a default profile image

const PendingRequests = ({ currentUserId }) => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Fetching pending requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/connection/pending-requests/${currentUserId}`);
      setRequests(response.data); // Set the fetched requests
    } catch (error) {
      console.error('Error fetching pending requests', error);
    }
  };

  // Fetch the requests once the component mounts
  useEffect(() => {
    fetchPendingRequests();
  }, [currentUserId]); // Refetch when currentUserId changes

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-10">
      <button
        className="absolute top-4 right-4 text-white text-2xl font-bold"
        onClick={() => navigate('/')} // Navigate to home page
      >
        &#10006;
      </button>
      <div className="bg-gray-600 shadow-lg rounded-lg p-6 w-full sm:w-3/4 md:w-1/2 lg:w-4/5" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-gray-200 mb-6 text-center">Pending Connection Requests</h2>

        {requests.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No pending requests.</p>
          </div>
        ) : (
          <ul>
            {requests.map((request) => (
              <li key={request._id} className="bg-gray-300 p-4 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-400 flex items-center justify-between mb-4">
                {/* Profile Image and User Info */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-500 rounded-full">
                    <img src={profileIcon} alt="User Profile" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{request.sender.username}</p>
                    <p className="text-gray-600">{request.sender.email}</p>
                  </div>
                </div>

                {/* Accept/Reject Buttons */}
                <AcceptRejectRequestButton
                  senderId={request.sender._id}
                  receiverId={currentUserId}
                  currentStatus={request.status}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
