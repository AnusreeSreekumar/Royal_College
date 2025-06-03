import React from 'react';
import Navbar from '../Components/Navbar';

const Addassignment = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="pt-5">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Add Assignment</h2>

          <label className="font-semibold mb-1 block">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="font-semibold mb-1 block">Upload File</label>
          <input
            type="file"
            className="w-full p-2.5 mb-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="font-semibold mb-1 block">Submission Date</label>
          <input
            type="date"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addassignment;
