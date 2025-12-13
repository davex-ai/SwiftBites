import React from 'react';
import logo from '/logo.png';
import call from '../assets/Vector.png';
import cart from '../assets/i.ri-shopping-cart-line.png';
import love from '../assets/i.ri-heart-3-line.png';

function Navbar() {
    
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div>
        <img src={logo} alt="SwiftBites Logo" className="h-10" />
      </div>

      <div className="space-x-8 hidden sm:flex">
        <a href="#" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">Home</a>
        <a href="#" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">About Us</a>
        <a href="#" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">Products</a>
        <a href="#" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">Profile</a>
      </div>

      <div className="sm:flex items-center space-x-5 hidden"> 
        <a href="#"><img src={cart} alt="" /></a>
        <a href="#"><img src={love} alt="" /> </a>
      </div>
    </div>
  );
}

export default Navbar;