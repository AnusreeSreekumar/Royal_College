import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import updateteacher from "../college_website/updateteacher.jpeg";

const UpdateTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [subjectsTaught, setSubjectsTaught] = useState("");
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherNames = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/admin/getTeacherNames",
          { credentials: "include" }
        );
        const data = await res.json();
        setTeachers(data.teachers || []);
      } catch (err) {
        setError("Failed to fetch teacher names");
      }
    };
    fetchTeacherNames();
  }, []);

  useEffect(() => {
    if (!selectedName) {
      setTeacherDetails(null);
      setSubjectsTaught("");
      setSchedule("");
      return;
    }
    const fetchTeacherDetails = async () => {
      try {
        const result = await fetch(
          `http://127.0.0.1:3000/api/teacher/getProfileDetails?name=${selectedName}`,
          {
            credentials: "include",
          }
        );
        const data = await result.json();
        console.log(data);
        
        const teacher = data.teachers && data.teachers[0];
        setTeacherDetails(teacher || null);
        setSubjectsTaught(
          teacher?.Subjects_Taught
            ? JSON.stringify(teacher.Subjects_Taught)
            : ""
        );
        setSchedule(teacher?.Schedule ? JSON.stringify(teacher.Schedule) : "");
      } catch (err) {
        setError("Failed to fetch teacher details");
      }
    };
    fetchTeacherDetails();
  }, [selectedName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("subjectsTaught: ", subjectsTaught);
      console.log("schedule: ", schedule);
      
      
      const res = await fetch(
        "http://localhost:3000/api/admin/updateTeacherSchedule",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: selectedName,
            subjectsTaught: JSON.parse(subjectsTaught),
            schedule: JSON.parse(schedule),
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Teacher updated successfully");
        navigate("/Dashboard");
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Failed to update teacher");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg max-w-5xl w-full rounded-lg overflow-hidden">
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-200">
          <img
            src={updateteacher}
            alt="Update Teacher"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Update Teacher
          </h2>
          {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <select
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Select a teacher</option>
                {teachers.map((t) => (
                  <option key={t.user_id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {teacherDetails && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Teacher ID
                  </label>
                  <input
                    type="text"
                    value={teacherDetails.teacher_id || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={teacherDetails.teacher_name || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={teacherDetails.qualification || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={teacherDetails.department || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Experience Years
                  </label>
                  <input
                    type="number"
                    value={teacherDetails.experience_years || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Subjects Taught (JSON array)
                  </label>
                  <input
                    type="text"
                    value={subjectsTaught}
                    onChange={(e) => setSubjectsTaught(e.target.value)}
                    placeholder='e.g. ["Data Structures", "Algorithms"]'
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Schedule (JSON array of objects)
                  </label>
                  <input
                    type="text"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder='e.g. [{"day":"Monday","time":"09:15 - 10:00"}]'
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition duration-300"
                >
                  Update Teacher
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;
