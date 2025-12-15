import React, { useState } from 'react';
import logo from '/logo.png';
import call from '../assets/Vector.png';
import cart from '../assets/i.ri-shopping-cart-line.png';
import love from '../assets/i.ri-heart-3-line.png';
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

function Navbar() {
    const [open, setOpen] = useState(false);
    const { user } = useAuth()

    return (
        <nav className="relative px-4 py-4 bg-white shadow-sm z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div><img src={logo} alt="SwiftBites Logo" className="h-8 md:h-10" /> </div>

                <div className="hidden sm:flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">Home</Link>
                    <Link to="/about" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">About Us</Link>
                    <Link to="/products" className="text-gray-700 hover:text-[#F53E32] hover:underline font-medium">Products</Link>
                    {user && (<Link to="/profile" className='text-gray-700 hover:text-[#F53E32] hover:underline font-medium'>Profile</Link>)}
                </div>

                <div className="hidden sm:flex items-center space-x-5">
                    <Link to="/cart" href="#"><img src={cart} alt="Cart" className="h-5 " /> </Link>
                    <Link to="/wishlist" href="#"><img src={love} alt="Wishlist" className="h-5 " /> </Link>
                </div>

                <div className="sm:hidden flex flex-col justify-center cursor-pointer" onClick={() => setOpen(!open)} aria-label="Toggle navigation" >
                    <span className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
            </div>

            <div className={`sm:hidden absolute left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col px-4 py-4 space-y-4">
                    <Link to="" href="#" className="text-gray-700 hover:text-[#F53E32] font-medium" onClick={() => setOpen(false)}  >Home </Link>
                    <Link to="" href="#" className="text-gray-700 hover:text-[#F53E32] font-medium" onClick={() => setOpen(false)}> About Us </Link>
                    <Link to="" href="#" className="text-gray-700 hover:text-[#F53E32] font-medium" onClick={() => setOpen(false)}>Products</Link>
                    {user && (<Link to="/profile" className='text-gray-700 hover:text-[#F53E32] hover:underline font-medium'>Profile</Link>)}
                    <Link to="" href="#"><img src={cart} alt="Cart" className="h-5 " /> </Link>
                    <Link to="" href="#"><img src={love} alt="Wishlist" className="h-5 " /> </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;