import React from 'react';
import leave from '../college_website/leave.jpg';
import Navbar from '../Components/Navbar';

const Applyleave = () => {
  return (
    <div className="bg-blue-200 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center py-10 px-4">
        <div className="flex flex-col lg:flex-row bg-white w-full max-w-6xl rounded-xl shadow-lg overflow-hidden">

          <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            <img src={leave} alt="Leave" className="w-full h-auto rounded-lg object-cover" />
          </div>

          <div className="lg:w-1/2 p-8 flex items-center justify-center">
            <form className="w-full">
              <p className="border-y-2 border-green-600 text-2xl text-center py-3 mb-6 font-semibold">
                Leave Application
              </p>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Reason for Leave"
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  placeholder="Description"
                  rows="3"
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="date"
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  type="submit"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md w-48 mx-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Applyleave;
