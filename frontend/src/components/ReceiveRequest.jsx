// AcceptRejectRequestButton.js
import React, { useState } from 'react';
import axios from 'axios';

const AcceptRejectRequestButton = ({ senderId, receiverId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await axios.post('http://localhost:5000/api/connection/update-status', {
        senderId,
        receiverId,
        status: newStatus,
      });

      setStatus(newStatus);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error updating status.");
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      {status === 'pending' && (
        <>
          <button
            onClick={() => handleUpdateStatus('accepted')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 shadow-md hover:shadow-lg"
          >
            Accept
          </button>
          <button
            onClick={() => handleUpdateStatus('rejected')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 shadow-md hover:shadow-lg"
          >
            Reject
          </button>
        </>
      )}
      {status === 'accepted' && <p className="text-orange-500 font-semibold">Request Accepted</p>}
      {status === 'rejected' && <p className="text-gray-500 font-semibold">Request Rejected</p>}
    </div>
  );
};

export default AcceptRejectRequestButton;
