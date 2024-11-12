// SendConnectRequestButton.js
import React, { useState } from 'react';
import axios from 'axios';

const SendConnectRequestButton = ({ receiverId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      const senderId = localStorage.getItem('userId'); // Assuming the logged-in user's ID is in localStorage
      const response = await axios.post('http://localhost:5000/api/connection/send-request', {
        senderId,
        receiverId,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Error sending request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSendRequest}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {loading ? "Sending..." : "Send Connection Request"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendConnectRequestButton;
