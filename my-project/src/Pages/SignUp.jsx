import React from 'react';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
      <div className="w-full max-w-4xl h-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-4xl font-bold">ROYAL COLLEGE</h2>
        </div>

        {/* Right Side - Form */}
        <form className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">SignUp</h3>

          <input
            type="text"
            name="Name"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="studentid"
            placeholder="Student ID"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition duration-300"
          >
            SignUp
          </button>

          <div className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-600">
            <p>Already have an account?</p>
            <a
              href="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
