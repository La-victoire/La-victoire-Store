import React from 'react'
import { Link } from 'react-router-dom'
import { MdContactMail } from "react-icons/md"; 
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";

const Footer = () => {
  const {logout} = useContext(AuthContext)

  return (
    <>
    <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; 2024 Victoire's Store. All Rights Reserved.</p>
      <div className="mt-4 flex justify-center space-x-4">
      
        <a href="https://web.facebook.com/profile.php?id=100090151486285" ><FaFacebook size={24} className='hover:text-gray-400' /></a>
        <a href="https://x.com/VOghuvbu" className="hover:text-gray-400"><FaXTwitter size={24} className='hover:text-gray-400' /></a>
        <a href="https://www.instagram.com/la_victoire360/" className="hover:text-gray-400"><FaInstagram size={24} className='hover:text-gray-400' /></a>
      </div>
      <button onClick={logout}>
        <TbLogout2 className='mt-4' size={27} title='Logout'/>
      </button>
    </div>
    <a href="https://www.flaticon.com/free-icons/commerce-and-shopping" title="commerce and shopping icons" className='ml-32'>Commerce and shopping icons created by HideMaru - Flaticon</a>

  </footer>
    </>
  )
}

export default Footer