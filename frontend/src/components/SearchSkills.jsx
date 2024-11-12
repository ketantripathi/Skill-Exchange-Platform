import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaRegSadTear } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/usericon.png'
import SendConnectRequestButton from './SendRequest'

function SearchSkills() {
    const [skill, setSkill] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSearch = async (e) => {
        try {
            setError('');
            setUsers([]);
            const response = await axios.get(`http://localhost:5000/api/search/skills`, { params: { skill } });

            console.log(skill)
            if (response.data.length > 0) {
                setUsers(response.data);
                setError('');
            } else {
                setError('No users found with this skill');
                setUsers([]);
            }
        } catch (err) {
            setError('Error fetching users. Please try again.');
        }
    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [sentRequest, setSentRequest] = useState('');

    const handleSendRequest = async (receiverId) => {
        try {
            setLoading(true);
            const senderId = localStorage.getItem('id'); // Assuming the logged-in user's ID is in localStorage
            console.log(senderId)
            console.log(receiverId)
            const response = await axios.post('http://localhost:5000/api/connection/send-request', {
                senderId,
                receiverId,
            });
            setSentRequest((prev)=> [...prev,receiverId])
            console.log(sentRequest)
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || "Error sending request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-10">
            <button
                className="absolute top-4 right-4 text-white text-2xl font-bold"
                onClick={() => navigate('/')} // Navigate to the home page
            >
                &#10006;
            </button>
            <div className="bg-gray-600 shadow-lg rounded-lg p-6 w-full sm:w-3/4 md:w-1/2 lg:w-4/5" data-aos="fade-up">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Search for Users by Skill</h2>

                <div className="flex items-center mb-4 relative">
                    <input
                        type="text"
                        placeholder="Enter skill"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none text-gray-700"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    />
                    <FaSearch className="absolute right-4 text-gray-400 text-xl" />
                </div>

                <button
                    onClick={handleSearch}
                    type='submit'
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
                >
                    Search
                </button>

                {error && (
                    <div className="mt-4 text-center text-red-600">
                        <p>{error}</p>
                        <FaRegSadTear className="mx-auto mt-2 text-4xl text-gray-400" />
                    </div>
                )}

                {users.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-200 mb-4">Users with {skill}:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                            {users.map((user) => (
                                <div key={user._id} className="bg-gray-300 p-4 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-400 flex items-center group relative">
                                    {/* Horizontal Layout */}
                                    <div className="flex flex-row items-center space-x-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gray-500 rounded-full">
                                            <img src={profileIcon} alt="" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Name: {user.username}</p>
                                            <p className="text-gray-950">Email: {user.email}</p>
                                            <p className="text-gray-950">Skills: {user.skills.join(', ')}</p>
                                        </div>
                                    </div>

                                    {/* Enroll Button */}
                                    {/* <button 
                                        className="absolute bottom-4 right-4 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                        Enroll
                                    </button> */}
                                    <button
                                        onClick={() => handleSendRequest(user._id)}
                                        disabled={loading}
                                        className="absolute bottom-4 right-4 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                    >
                                        {sentRequest.includes(user._id) ? "Sent" : loading ? "Sending..." : "Connect"}
                                    </button>
                                    
                                </div>
                            ))}
                        </div>

                    </div>
                )}


                {/* If nothing is searched yet */}
                {!skill && !error && (
                    <div className="mt-4 text-center text-gray-500">
                        <p><FaSearch className="mx-auto text-5xl text-orange-500" /></p>
                        <p className="mt-2">Start by searching for a skill!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchSkills;
