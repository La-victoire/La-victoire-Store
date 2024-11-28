import React from 'react'
import { Link } from 'react-router-dom'
import { MdContactMail } from "react-icons/md"; 
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';

const Footer = () => {
  const {logout} = useContext(AuthContext)

  return (
    <>
    <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; 2024 Victoire's Store. All Rights Reserved.</p>
      <div className="mt-4 flex justify-center space-x-4">
      <li><Link to="/" className="hover:text-gray-400"><MdContactMail size={24} title='Contact'/></Link></li>

        <a href="#" className="hover:text-gray-400">Facebook</a>
        <a href="#" className="hover:text-gray-400">Twitter</a>
        <a href="#" className="hover:text-gray-400">Instagram</a>
      </div>
      <button onClick={logout}>
        logout
      </button>
    </div>
    <a href="https://www.flaticon.com/free-icons/commerce-and-shopping" title="commerce and shopping icons" className='ml-32'>Commerce and shopping icons created by HideMaru - Flaticon</a>

  </footer>
    </>
  )
}

export default Footer