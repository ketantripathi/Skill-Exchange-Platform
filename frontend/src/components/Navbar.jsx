import React from 'react'
import profileIcon from '../assets/usericon.png'
import {Link} from 'react-router-dom'

function Navbar({isLoggedIn}) {
  return (
    <nav className="w-full bg-gradient-to-r from-orange-600 to-orange-400 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold" data-aos="fade-down">SkillExchange</h1>
          <div>
            {isLoggedIn ? (<>
              <div className='flex items-center space-x-8'>
              <Link to="/request" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-8 hover:border-gray-100 hover:border-2 p-1 hover:size-9 rounded-full">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
            </svg>
              </Link>
              <Link to="/profile" className="text-white">
                <img src={profileIcon} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer hover:border-gray-100 hover:border-2 p-1 hover:scale-125" />
              </Link>
              </div></>
            ) : (
              <>
                <Link to="/login" className="text-white px-4 py-2 rounded hover:bg-orange-400">Login</Link>
                <Link to="/register" className="text-white px-4 py-2 rounded hover:bg-orange-400">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
  )
}

export default Navbar