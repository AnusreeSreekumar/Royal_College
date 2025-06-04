import React, { useState, useEffect } from 'react';
import teacherImg from '../college_website/addteacher.jpeg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    role: 'teacher',
    year: '',
    batch: '',
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, batchRes] = await Promise.all([
          fetch('http://localhost:3000/api/admin/getCourseDetails', { credentials: 'include' }), 
          fetch('http://localhost:3000/api/admin/getBatchDetails', { credentials: 'include' }),
        ]);
        const courseData = await courseRes.json();
        const batchData = await batchRes.json();
        setCourses(courseData.courses || []);
        setBatches(batchData.courses || []);
      } catch (err) {
        console.error('Failed to fetch courses/batches', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:3000/api/admin/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (response.ok) {
          alert(text);
          navigate('/Dashboard');
          return;
        } else {
          throw new Error(text);
        }
      }

      if (response.ok) {
        alert(data.message);
        navigate('/Dashboard');
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit.');
      console.error(err);
    }
  };

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
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="flex flex-col md:flex-row items-center max-w-5xl w-full shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/2 w-full">
            <img src={teacherImg} alt="Teacher" className="w-full h-full object-cover" />
          </div>

          <div className="md:w-1/2 w-full p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-center underline">Teacher Registration</h2>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.CourseId || course.id} value={course.CourseName}>
                    {course.CourseName}
                  </option>
                ))}
              </select>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>

              <input
                type="text"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />

              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch.BatchId || batch.id} value={batch.BatchName}>
                    {batch.BatchName}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Register Teacher
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;