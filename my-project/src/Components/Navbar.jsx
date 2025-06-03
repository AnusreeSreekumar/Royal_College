import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../college_website/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-6 md:px-24 h-20 bg-white shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-48 md:w-48" />
      </div>

      {/* Desktop Navbar Links */}
      <div className="hidden md:flex items-center gap-5 text-sm font-medium">
        <Link to="/" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          Home
        </Link>
        <Link to="/Assignment" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          Add Assignment
        </Link>
        <Link to="/Attendance" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          Attendance
        </Link>
        <Link to="/Account" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          Account
        </Link>
        <Link to="/Studentattendance" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          Student Attendance
        </Link>
        <Link to="/SignUp" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          SignUp
        </Link>
        <Link to="/Login" className="text-black py-2 px-4 rounded-lg hover:bg-gray-100">
          Login
        </Link>
        <Link
          to="/Applyleave"
          className="bg-green-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-600 transition"
        >
          APPLY LEAVE
        </Link>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-md p-4 flex flex-col items-center md:hidden">
          <Link
            to="/"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            Home
          </Link>
          <Link
            to="/Assignment"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            Add Assignment
          </Link>
          <Link
            to="/Attendance"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            Attendance
          </Link>
          <Link
            to="/Account"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            Account
          </Link>
          <Link
            to="/Studentattendance"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            Student Attendance
          </Link>
          <Link
            to="/SignUp"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            SignUp
          </Link>
          <Link
            to="/Login"
            className="text-black py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-center"
          >
            Login
          </Link>
          <Link
            to="/Applyleave"
            className="bg-green-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-600 transition w-full text-center"
          >
            APPLY LEAVE
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
