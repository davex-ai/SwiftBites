// src/components/Navbar.jsx
import React, { useState } from 'react';
import logo from '/logo.png';
import cart from '../assets/i.ri-shopping-cart-line.png';
import love from '../assets/i.ri-heart-3-line.png';
import { useAuth } from "../context/AuthContext";
import { useCartWishlist } from "../context/CartWishlistContext";
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount, wishlistCount } = useCartWishlist();

  return (
    <nav className="relative px-4 py-4 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <img src={logo} alt="SwiftBites Logo" className="h-8 md:h-10" />
        </div>

        <div className="hidden sm:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">
            About Us
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">
            Products
          </Link>
          {user && (
            <Link to="/profile" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">
              Profile
            </Link>
          )}
        </div>

        {/* CART & WISHLIST ICONS WITH BADGES */}
        <div className="hidden sm:flex items-center space-x-5 relative">
          <Link to="/cart" className="relative">
            <img src={cart} alt="Cart" className="h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F53E32] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/wishlist" className="relative">
            <img src={love} alt="Wishlist" className="h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div
          className="sm:hidden flex flex-col justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden absolute left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col px-4 py-4 space-y-4">
          <Link to="/" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#F53E32] font-medium">
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#F53E32] font-medium">
            About Us
          </Link>
          <Link to="/products" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#F53E32] font-medium">
            Products
          </Link>
          {user && (
            <Link to="/profile" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#F53E32] font-medium">
              Profile
            </Link>
          )}
          
          {/* Mobile cart & wishlist with badges */}
          <div className="flex space-x-4 pt-2">
            <Link to="/cart" onClick={() => setOpen(false)} className="relative">
              <img src={cart} alt="Cart" className="h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F53E32] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/wishlist" onClick={() => setOpen(false)} className="relative">
              <img src={love} alt="Wishlist" className="h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;