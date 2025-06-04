import React, { useState, useEffect } from 'react';
import FeatureSection from '../Components/FeatureSection';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import dashboard from '../college_website/dashboard.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('http://localhost:3000/api/auth/verifyToken', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        navigate('/login');
      } else {
        const data = await res.json();
        setUserRole(data.userRole);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  if (userRole !== 'admin') {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-2xl text-red-600">Access Denied: Admins only</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen font-sans overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${dashboard})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white">
          <p className="text-5xl font-bold mb-10 drop-shadow">Welcome</p>

          {/* Dropdown Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {/* Student Dropdown */}
            <select
              className="bg-white text-black py-2 px-4 rounded shadow font-semibold"
              onChange={(e) => {
                if (e.target.value === 'add') navigate('/addstudent');
              }}
            >
              <option value="">Student</option>
              <option value="add">Add Student</option>
              <option value="add">Update Student</option>
              <option value="add">Delete Student</option>
            </select>

            {/* Teacher Dropdown */}
            <select
              className="bg-white text-black py-2 px-4 rounded shadow font-semibold"
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'add') navigate('/AddTeacher');
                else if (value === 'update') navigate('/UpdateTeacher');
                else if (value === 'delete') navigate('/DeleteTeacher');
              }}
            >
              <option value="">Teacher</option>
              <option value="add">Add Teacher</option>
              <option value="update">Update Teacher</option>
              <option value="delete">Delete Teacher</option>
            </select>

            {/* Course Dropdown */}
            <select
              className="bg-white text-black py-2 px-4 rounded shadow font-semibold"
              onChange={(e) => {
                if (e.target.value === 'add') navigate('/addcourse');
              }}
            >
              <option value="">Course</option>
              <option value="add">Add Course</option>
              <option value="add">Update Course</option>
              <option value="add">Delete Course</option>
            </select>
          </div>

          {/* Feature Section */}
          <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <FeatureSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;