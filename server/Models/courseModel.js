import { connection } from "../main.js";

const createCourseTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS "Course" (
      "CourseId" SERIAL PRIMARY KEY,
      "CourseName" VARCHAR(100) NOT NULL,
      "CourseCode" VARCHAR(20) UNIQUE NOT NULL,
      "Department" VARCHAR(50) NOT NULL,
      "DurationYears" INT NOT NULL,
      "IsActive" BOOLEAN DEFAULT true,
      "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "UpdatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await connection.query(query);
    console.log('Course table created successfully.');
  } 
  catch (err) {
    console.error('Error creating Course table:', err.message);
  }
};

export default createCourseTable;