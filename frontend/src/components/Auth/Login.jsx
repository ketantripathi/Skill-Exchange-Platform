import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setSuccess('Login successful!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      props.setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <button
        className="absolute top-4 right-4 text-gray-200 text-2xl font-bold"
        onClick={() => navigate('/')}
      >
        &#10006;
      </button>
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-900 shadow-lg rounded px-8 py-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Login</h2>
        {error && <p className="text-red-400 text-xs italic mb-4">{error}</p>}
        {success && <p className="text-green-400 text-xs italic mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-around">
          <button 
            className={`bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button 
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
