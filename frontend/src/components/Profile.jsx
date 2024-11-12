// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
const Profile = ({onLogout}) => {
  const [user, setUser] = useState({ username: 'JohnDoe', email: 'johndoe@example.com', skills: ['JavaScript', 'React', 'Node.js'] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
        const id = localStorage.getItem('id')
        const response = await axios.get(`http://localhost:5000/api/users/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the Authorization header
          }
        });
        console.log(id);

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/'); // Redirect to login page after logging out
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 p-4">
      <button onClick={handleLogout} className="absolute top-4 right-16 bg-orange-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-500 transition duration-300">
          Logout
      </button>
      <button
        className="absolute top-4 right-4 text-white text-2xl font-bold"
        onClick={() => navigate('/')} // Navigate to the home page
      >
        &#10006;
      </button>
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md transition duration-300 transform hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-500">Profile</h2>
        <div className="mb-5">
          <strong className="block text-gray-400 text-lg">Username:</strong>
          <p className="text-xl font-medium text-gray-100">{user.username}</p>
        </div>
        <div className="mb-5">
          <strong className="block text-gray-400 text-lg">Email:</strong>
          <p className="text-xl font-medium text-gray-100">{user.email}</p>
        </div>
        <div className="mb-5">
          <strong className="block text-gray-400 text-lg">Skills:</strong>
          <p className="text-xl font-medium text-gray-100">{user.skills.join(', ')}</p>
        </div>
        <div className="text-center mt-8">
          <button onClick={()=> navigate('/edit-profile')} className="px-6 py-3 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-500 transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
