import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [user, setUser] = useState({ username: '', email: '', skills: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          console.error('No token found, please log in.');
          return;
        }
        const id = localStorage.getItem('id');
        const response = await axios.get(`http://localhost:5000/api/users/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the Authorization header
          },
        });
        setUser({
          username: response.data.username,
          email: response.data.email,
          skills: response.data.skills.join(', '), // Assuming skills is an array
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/${id}`,
        {
          username: user.username,
          email: user.email,
          skills: user.skills.split(',').map((skill) => skill.trim()), // Convert skills back to an array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Profile updated:', response.data);
      navigate('/'); // Navigate back to the profile page after saving changes
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-800 p-4">
      <button
        className="absolute top-4 right-4 text-white text-2xl font-bold"
        onClick={() => navigate('/')} 
      >
        &#10006;
      </button>
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md transition duration-300 transform hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-500">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-200 text-lg">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="text-xl font-medium text-gray-100 w-full bg-gray-800 p-2 border border-gray-800 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-200 text-lg">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="text-xl font-medium text-gray-100 w-full bg-gray-800 p-2 border border-gray-800 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-200 text-lg">Skills (comma-separated):</label>
            <input
              type="text"
              name="skills"
              value={user.skills}
              onChange={handleChange}
              className="text-xl font-medium text-gray-100 w-full bg-gray-800 p-2 border border-gray-800 rounded"
            />
          </div>
          <div className="text-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-500 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
