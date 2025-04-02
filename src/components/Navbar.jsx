import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Stdlib Showcase</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
            <Link to="/ndarray" className="hover:text-indigo-200 transition">Ndarray</Link>
            <Link to="/math" className="hover:text-indigo-200 transition">Math</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar