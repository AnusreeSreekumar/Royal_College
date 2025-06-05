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
    } catch (error) {
      console.error("Error fetching teacher names:", error.message);
      res.status(500).json({ error: "Failed to fetch teacher names" });
    }
  } else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});

adminrouter.get("/getCourseDetails",verifyUserToken, async (req, res) => {
   
  if (req.loginRole == "admin") {
    try {
      const fetchquery = `
        SELECT *
        FROM "Courses"`;

      const result = await connection.query(fetchquery);

      res.status(200).json({ courses: result.rows });
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  } else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});

adminrouter.get("/getBatchDetails",verifyUserToken, async (req, res) => {
   
  if (req.loginRole == "admin") {
    try {
      const fetchquery = `
        SELECT *
        FROM "Batches"`;

      const result = await connection.query(fetchquery);

      res.status(200).json({ courses: result.rows });
    } catch (error) {
      console.error("Error fetching batches:", error.message);
      res.status(500).json({ error: "Failed to fetch batch" });
    }
  } else {
    res.status(404).send("Unauthorised access");
    console.log("Invalid access");
  }
});

adminrouter.patch("/updateTeacherSchedule", verifyUserToken, async (req, res) => {
 
  if (req.loginRole === "admin") {
   
    const { name, subjectsTaught, schedule } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Teacher name is required" });
    }

    try {

      const fetchQuery = `SELECT Subjects_Taught, Schedule FROM "Teachers" WHERE Teacher_name = $1`;
      const fetchResult = await connection.query(fetchQuery, [name]);

      if (fetchResult.rowCount === 0) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      let existingSubjects = fetchResult.rows[0].subjects_taught || [];
      console.log("1 ",existingSubjects);
      
      let mergedSubjects = Array.isArray(existingSubjects)
        ? Array.from(new Set([...existingSubjects, ...(subjectsTaught || [])]))
        : subjectsTaught || [];
        console.log("2", mergedSubjects);
        
      let existingSchedule = fetchResult.rows[0].schedule || [];
      console.log("3", existingSchedule);
      
      let mergedSchedule = Array.isArray(existingSchedule)
        ? [...existingSchedule, ...(schedule || [])]
        : schedule || [];
        console.log("4", mergedSchedule);
        

      const updateQuery = `
        UPDATE "Teachers"
        SET Subjects_Taught = $1, Schedule = $2
        WHERE Teacher_name = $3
        RETURNING *;
      `;

      const updateResult = await connection.query(updateQuery, [
        JSON.stringify(mergedSubjects),
        JSON.stringify(mergedSchedule),
        name,
      ]);

      res.status(200).json({
        message: "Teacher updated successfully (merged)",
        teacher: updateResult.rows[0],
      });
    } 
    catch (error) {
      console.error("Error updating teacher:", error.message);
      res.status(500).json({ message: "Failed to update teacher" });
    }
  } 
  else {
    res.status(403).json({ message: "Unauthorized access" });
    console.log("Invalid access");
  }
});

adminrouter.delete("/deleteTeacher", verifyUserToken, async (req, res) => {
 
  if (req.loginRole === "admin") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Teacher name is required" });
    }

    try {

      const checkQuery = `SELECT * FROM "Users" WHERE "Name" = $1 AND "Role" = 'teacher'`;
      const userResult = await connection.query(checkQuery, [name]);

      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "No teacher found with the given name" });
      }
      const deleteQuery = `DELETE FROM "Users" WHERE "Name" = $1 AND "Role" = 'teacher'`;
      const deleteResult = await connection.query(deleteQuery, [name]);

      if (deleteResult.rowCount > 0) {
        res.status(200).json({ message: `Teacher '${name}' deleted successfully` });
        console.log(`Deleted teacher with name: ${name}`);
      } else {
        res.status(500).json({ message: "Deletion failed unexpectedly" });
      }
    } catch (error) {
      console.error("Error deleting teacher:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }

  } else {
    res.status(403).json({ message: "Unauthorized access" });
    console.log("Unauthorized delete attempt");
  }
});


export default adminrouter;
