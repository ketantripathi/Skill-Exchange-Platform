// // src/components/Home.js
// import React from 'react';
// import { Link,useNavigate } from 'react-router-dom';

// const Home = ({ isLoggedIn, onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     // Perform logout actions (e.g., clear token, reset state)
//     onLogout();
//     navigate('/'); // Redirect to login page after logging out
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
//       {/* Navigation Bar */}
//       <nav className="w-full bg-blue-600 p-4 shadow-lg">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-white text-3xl font-bold">SkillExchange</h1>
//           <div>
//             {isLoggedIn ? (
//               <>
//                 <Link to="/profile" className="text-white">
//                   <img src="/path/to/profile-icon.png" alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
//                 </Link>
//                 <button onClick={handleLogout} className="text-white px-4 py-2 rounded hover:bg-blue-500">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-white px-4 py-2 rounded hover:bg-blue-500">Login</Link>
//                 <Link to="/register" className="text-white px-4 py-2 rounded hover:bg-blue-500">Register</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center mt-20">
//         <h2 className="text-5xl font-extrabold mb-4 text-gray-800">Unlock Your Potential</h2>
//         <p className="text-xl mb-6 text-gray-600">Join our community to exchange skills and learn from each other!</p>
//         <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-500 transition duration-300">
//           Get Started
//         </Link>
//       </section>

//       {/* Features Section */}
//       <section className="mt-20 px-6">
//         <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Key Features</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
//             <h4 className="text-2xl font-semibold text-blue-600 mb-4">Connect with Others</h4>
//             <p className="text-gray-700">Find and connect with people who have the skills you want to learn, building a network for growth.</p>
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
//             <h4 className="text-2xl font-semibold text-blue-600 mb-4">Skill Listings</h4>
//             <p className="text-gray-700">Post your skills and discover what others are offering. Learn and grow by collaborating with fellow learners.</p>
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
//             <h4 className="text-2xl font-semibold text-blue-600 mb-4">Flexible Learning</h4>
//             <p className="text-gray-700">Learn at your own pace, from a variety of skills available. Tailor your learning experience to your needs.</p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="bg-blue-50 mt-20 py-16">
//         <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">How SkillExchange Works</h3>
//         <div className="flex flex-col md:flex-row items-center justify-around">
//           <div className="mb-8 md:mb-0 text-center md:text-left">
//             <h4 className="text-2xl font-semibold text-blue-600 mb-4">Step 1: Sign Up</h4>
//             <p className="text-gray-600">Create an account and fill out your profile with the skills you can offer and want to learn.</p>
//           </div>
//           <div className="mb-8 md:mb-0 text-center md:text-left">
//             <h4 className="text-2xl font-semibold text-blue-600 mb-4">Step 2: Connect with Others</h4>
//             <p className="text-gray-600">Browse and connect with individuals who offer the skills you're looking to learn, and vice versa.</p>
//           </div>
//           <div className="text-center md:text-left">
//             <h4 className="text-2xl font-semibold text-blue-600 mb-4">Step 3: Exchange Skills</h4>
//             <p className="text-gray-600">Engage in learning sessions and share your expertise with others. Learn and teach for mutual growth.</p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="mt-20 px-6">
//         <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h3>
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="bg-white p-8 rounded-lg shadow-lg text-center transition transform hover:scale-105">
//             <p className="text-xl text-gray-600 mb-4">"SkillExchange has helped me connect with people who have the skills I need to advance in my career."</p>
//             <p className="font-semibold text-blue-600">John Doe</p>
//             <p className="text-gray-500">Software Developer</p>
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-lg text-center transition transform hover:scale-105">
//             <p className="text-xl text-gray-600 mb-4">"The platform is easy to use, and I've learned so many new skills from other users!"</p>
//             <p className="font-semibold text-blue-600">Jane Smith</p>
//             <p className="text-gray-500">Marketing Specialist</p>
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-lg text-center transition transform hover:scale-105">
//             <p className="text-xl text-gray-600 mb-4">"Thanks to SkillExchange, I found the perfect mentor who helped me get ahead in my field."</p>
//             <p className="font-semibold text-blue-600">Alice Johnson</p>
//             <p className="text-gray-500">Graphic Designer</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="bg-blue-600 text-white py-16 mt-20 text-center">
//         <h2 className="text-4xl font-bold mb-4">Ready to Start Learning and Teaching?</h2>
//         <p className="text-xl mb-8">Join the community today and unlock your potential!</p>
//         <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
//           Get Started
//         </Link>
//       </section>
      
//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8 mt-20 w-full text-center">
//         <p>&copy; 2024 SkillExchange. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// src/components/Home.js


import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import profileIcon from '../assets/usericon.png'
import Navbar from './Navbar';

const Home = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-gray-300">
      
      <Navbar isLoggedIn={isLoggedIn}/>
      {/* <nav className="w-full bg-gradient-to-r from-orange-600 to-orange-400 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold" data-aos="fade-down">SkillExchange</h1>
          <div>
            {isLoggedIn ? (
              <Link to="/profile" className="text-white">
                <img src={profileIcon} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer hover:border-gray-100 hover:border-2 p-1 hover:scale-125" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-white px-4 py-2 rounded hover:bg-orange-400">Login</Link>
                <Link to="/register" className="text-white px-4 py-2 rounded hover:bg-orange-400">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20" data-aos="zoom-in">
        <h2 className="text-5xl font-extrabold mb-4 text-white">Unlock Your Potential</h2>
        <p className="text-xl mb-6 text-gray-400">Join our community to exchange skills and learn from each other!</p>
        {isLoggedIn?(<><Link to="/search-skills" className="bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-orange-500 transition duration-300">
          Learn New Skills Now!
        </Link></>):(<><Link to="/register" className="bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-orange-500 transition duration-300">
          Get Started
        </Link></>)}
      </section>

      {/* Features Section */}
      <section className="mt-20 px-6">
        <h3 className="text-4xl font-bold text-center mb-12 text-white" data-aos="fade-up">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div onClick={()=> navigate('/search-skills')} className="cursor-pointer hover:scale-125 bg-gray-900 p-8 rounded-lg shadow-xl transition transform" data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-2xl font-semibold text-orange-600 mb-4">Connect with Others</h4>
            <p className="text-gray-300">Find and connect with people who have the skills you want to learn, building a network for growth.</p>
          </div>
          <div onClick={()=> navigate('/edit-profile')} className="cursor-pointer hover:scale-125 bg-gray-900 p-8 rounded-lg shadow-xl transition transform" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-2xl font-semibold text-orange-600 mb-4">Skill Listings</h4>
            <p className="text-gray-300">Post your skills and discover what others are offering. Learn and grow by collaborating with fellow learners.</p>
          </div>
          <div onClick={()=> navigate('/chat')} className="cursor-pointer hover:scale-125 bg-gray-900 p-8 rounded-lg shadow-xl transition transform" data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-2xl font-semibold text-orange-600 mb-4">Flexible Learning</h4>
            <p className="text-gray-300">Learn at your own pace, from a variety of skills available. Tailor your learning experience to your needs.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-700 mt-20 py-16" data-aos="fade-right">
        <h3 className="text-4xl font-bold text-center mb-12 text-white">How SkillExchange Works</h3>
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="mb-8 md:mb-0 text-center md:text-left" data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-2xl font-semibold text-orange-600 mb-4">Step 1: Sign Up</h4>
            <p className="text-gray-300">Create an account and fill out your profile with the skills you can offer and want to learn.</p>
          </div>
          <div className="mb-8 md:mb-0 text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-2xl font-semibold text-orange-600 mb-4">Step 2: Connect with Others</h4>
            <p className="text-gray-300">Browse and connect with individuals who offer the skills you're looking to learn, and vice versa.</p>
          </div>
          <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-2xl font-semibold text-orange-600 mb-4">Step 3: Exchange Skills</h4>
            <p className="text-gray-300">Engage in learning sessions and share your expertise with others. Learn and teach for mutual growth.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-20 px-6" data-aos="fade-left">
        <h3 className="text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center transition transform hover:scale-105" data-aos="zoom-in" data-aos-delay="100">
            <p className="text-xl text-gray-300 mb-4">"SkillExchange has helped me connect with people who have the skills I need to advance in my career."</p>
            <p className="font-semibold text-orange-600">John Doe</p>
            <p className="text-gray-500">Software Developer</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center transition transform hover:scale-105" data-aos="zoom-in" data-aos-delay="200">
            <p className="text-xl text-gray-300 mb-4">"The platform is easy to use, and I've learned so many new skills from other users!"</p>
            <p className="font-semibold text-orange-600">Jane Smith</p>
            <p className="text-gray-500">Marketing Specialist</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center transition transform hover:scale-105" data-aos="zoom-in" data-aos-delay="300">
            <p className="text-xl text-gray-300 mb-4">"Thanks to SkillExchange, I found the perfect mentor who helped me get ahead in my field."</p>
            <p className="font-semibold text-orange-600">Alice Johnson</p>
            <p className="text-gray-500">Graphic Designer</p>
          </div>
        </div>
      </section>

      {isLoggedIn? "" : (<><section data-aos="zoom-in" className="bg-orange-600 text-white py-16 mt-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Learning and Teaching?</h2>
        <p className="text-xl mb-8">Join the community today and unlock your potential!</p>
        <Link to="/register" className="bg-gray-900 text-orange-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
          Get Started
        </Link>
      </section></>)}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20 w-full text-center">
        <p>&copy; 2024 SkillExchange. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;