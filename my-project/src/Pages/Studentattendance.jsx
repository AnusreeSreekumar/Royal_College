import React from 'react';
import Navbar from '../Components/Navbar';

const Studentattendance = () => {
  return (
    <div className="min-h-screen bg-lightblue p-5">
      <div className="pt-5">
        <Navbar />
      </div>
      <div className="border-b border-gray-300 pb-4">
        <p className="text-4xl font-bold text-center text-gray-800">Manage Attendance</p>
      </div>
      <div className="flex flex-col lg:flex-row pt-10 gap-8">
        <div className="flex-1 min-w-[700px]">
          <div className="bg-white p-8 rounded-lg shadow-lg mt-10">
            <div className="flex gap-10 flex-wrap">
              <div>
                <label className="text-lg font-semibold text-gray-700">Course</label><br />
                <select className="w-72 p-3 mt-2 rounded-lg text-lg border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">English</option>
                  <option value="">Blockchain</option>
                  <option value="">Cybersecurity</option>
                  <option value="">PCB Designs</option>
                </select>
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-700">Date</label><br />
                <input type="date" className="w-72 p-3 mt-2 rounded-lg text-lg border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg mt-5 p-5 shadow-lg">
            <div className="bg-[#F4F4F4] rounded-lg p-4 h-16 flex justify-center items-center shadow-md">
              <p className="text-3xl font-semibold underline text-gray-800">Attendance Sheet</p>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-lg text-gray-700">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left border-b border-gray-300">Student Name</th>
                    <th className="px-4 py-3 text-center border-b border-gray-300">Present</th>
                    <th className="px-4 py-3 text-center border-b border-gray-300">Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {["John Doe", "Jane Smith", "Mike Johnson", "Emily Davis"].map((name, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b border-gray-200">{name}</td>
                      <td className="text-center border-b border-gray-200">
                        <input type="radio" name={`attendance-${index}`} value="present" />
                      </td>
                      <td className="text-center border-b border-gray-200">
                        <input type="radio" name={`attendance-${index}`} value="absent" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-md cursor-pointer text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Submit Attendance
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md mt-10 min-w-[250px] flex-1">
          <p className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-3">
            Students Markings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Studentattendance;
