import { connection } from "../main.js";

const createstudentTable = async () => {

    const query = `CREATE TABLE "Students" (
    User_Id INTEGER PRIMARY KEY REFERENCES "Users"("User_Id") ON DELETE CASCADE,
    Student_Code TEXT UNIQUE, 
    Guardian_Name TEXT,
    Address TEXT,
    DOB DATE,
    Gender VARCHAR(10),
    Blood_Group VARCHAR(5),
    Admission_Date DATE,
    Documents JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    
    try {
    await connection.query(query);
    console.log("Student table created successfully.");
  } catch (err) {
    console.error("Error creating Student table:", err.message);
  }

}

createstudentTable();    
export default createstudentTable