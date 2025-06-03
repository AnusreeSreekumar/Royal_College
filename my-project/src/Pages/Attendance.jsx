import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Attendancelogo from '../college_website/attendance.webp';

const Attendance = () => {
  const [studentName, setStudentName] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('present');
  const [students, setStudents] = useState([]);

  const today = new Date().toISOString().split('T')[0];
  const [attendanceDate] = useState(today);
  const [attendanceTime, setAttendanceTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setAttendanceTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchedStudents = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Davis'];
    setStudents(fetchedStudents);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Attendance marked for ${studentName}: ${attendanceStatus} on ${attendanceDate} at ${attendanceTime}`);
  };

  return (
    <div className="bg-blue-200 min-h-screen font-sans">
      <div className="pt-4">
        <Navbar />
      </div>

      <div className="flex justify-center items-center min-h-[80vh] p-6">
        {/* Combined Section for Image and Form */}
        <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg">

          {/* Image Section */}
          <div className="flex justify-center items-center w-full lg:w-1/2 p-4">
            <img src={Attendancelogo} alt="Attendance" className="h-auto w-full object-contain" />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Mark Attendance</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Student Dropdown */}
              <div>
                <label htmlFor="student" className="block text-sm font-medium mb-1">Select Student</label>
                <select
                  id="student"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a student</option>
                  {students.map((student, index) => (
                    <option key={index} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date (Today Only)</label>
                <input
                  type="text"
                  value={attendanceDate}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium mb-1">Time (Auto-updated)</label>
                <input
                  type="text"
                  value={attendanceTime}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1">Attendance Status</label>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="present"
                      checked={attendanceStatus === 'present'}
                      onChange={() => setAttendanceStatus('present')}
                      className="mr-2"
                    />
                    Present
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="absent"
                      checked={attendanceStatus === 'absent'}
                      onChange={() => setAttendanceStatus('absent')}
                      className="mr-2"
                    />
                    Absent
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
              >
                Submit Attendance
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
