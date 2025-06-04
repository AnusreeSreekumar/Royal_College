import React, { useEffect, useState } from 'react';

const DeleteTeacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/teachers') 
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => console.error('Error fetching teachers:', err));
  }, []);

  // Delete teacher by ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const res = await fetch(`http://localhost:3000/api/teachers/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setTeachers(prev => prev.filter(teacher => teacher._id !== id));
        } else {
          console.error('Failed to delete teacher');
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Delete Teacher</h1>

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500">No teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-red-100 text-red-800">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Batch</th>
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="border-t">
                  <td className="py-2 px-4">{teacher.Name}</td>
                  <td className="py-2 px-4">{teacher.Email}</td>
                  <td className="py-2 px-4">{teacher.Course}</td>
                  <td className="py-2 px-4">{teacher.Batch}</td>
                  <td className="py-2 px-4">{teacher.Year}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeleteTeacher;
