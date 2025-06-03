import { Router } from "express";
import { connection } from "../main.js";
import { verifyUserToken } from "../Middleware/verifyUserToken.js";

const adminrouter = Router();

adminrouter.post("/addUser", verifyUserToken, async (req, res) => {
  if (req.loginRole == "admin") {
    try {
      const { name, email, course, role, year, batch } = req.body;
      const dummyPassword = "Temp@123";

      await connection.query(
        `INSERT INTO "Users" (name, email, password, course, role, year, batch) 
   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, email, dummyPassword, course, role, year, batch]
      );

      res.status(201).send("User added with default password");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding user");
    }
  } else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});

adminrouter.post("/addCourse", verifyUserToken, async (req, res) => {
  if (req.loginRole == "admin") {
    try {
      const { coursename, coursecode, department, durationyears, isActive } =
        req.body;
      const coursequery = `SELECT * FROM "Courses" WHERE "CourseName" = $1`;

      const courseExist = await connection.query(coursequery, [coursename]);

      if (courseExist.rows.length > 0) {
        console.log("Course already added");
        return res.status(404).json({ message: "Course already available" });
      }

      await connection.query(
        `INSERT INTO "Courses" ("CourseName", "CourseCode", "Department", "DurationYears", "IsActive") 
        VALUES ($1, $2, $3, $4, $5)`,
        [coursename, coursecode, department, durationyears, isActive]
      );

      res.status(201).send("Course successfully added");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding Course");
    }
  } else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});

adminrouter.post("/addBatch", verifyUserToken, async (req, res) => {
  
  if (req.loginRole == "admin") {
    try {
      const { batchname, courseid, year, startdate, enddate } = req.body;
      const batchquery = `SELECT * FROM "Batches" WHERE "BatchName" = $1`;

      const batchExist = await connection.query(batchquery, [batchname]);
      if (batchExist.rows.length > 0) {
        console.log("Batch already added");
        return res.status(404).json({ message: "Batch alrady available" });
      }

      await connection.query(
        `INSERT INTO "Batches" ("BatchName", "CourseId", "Year", "StartDate", "EndDate") 
        VALUES ($1, $2, $3, $4, $5)`,
        [batchname, courseid, year, startdate, enddate]
      );

      res.status(201).send("Batch successfully added");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding Batch");
    }
  } else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});

adminrouter.get("/getTeacherNames", verifyUserToken, async (req, res) => {
  
  if (req.loginRole == "admin") {
    try {
      const fetchquery = `
        SELECT user_id, name
        FROM "Users"
        WHERE role = 'teacher'`;

      const result = await connection.query(fetchquery);

      res.status(200).json({ teachers: result.rows });
    } 
    catch (error) {
      console.error("Error fetching teacher names:", error.message);
      res.status(500).json({ error: "Failed to fetch teacher names" });
    }
  } 
  else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});
export default adminrouter;
