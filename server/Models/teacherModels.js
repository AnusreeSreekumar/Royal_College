import { connection } from "../main.js";

const createTeachrTable = async () => {
 
  const query = `CREATE TABLE IF NOT EXISTS "Teachers" (
  User_Id INTEGER PRIMARY KEY REFERENCES "Users"("User_Id") ON DELETE CASCADE,
  Teacher_Id TEXT UNIQUE,           
  Qualification VARCHAR(100),
  Department VARCHAR(100),
  Experience_Years INT,
  Subjects_Taught JSON,                 
  Schedule JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) `;

  try {
    await connection.query(query);
    console.log("Teacher table created successfully.");
  } catch (err) {
    console.error("Error creating Teacher table:", err.message);
  }
};

createTeachrTable();
export default createTeachrTable;
