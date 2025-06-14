import { connection } from "../main.js";
import { Router } from "express";
import { verifyUserToken } from "../Middleware/verifyUserToken.js";

const teachrouter = Router();

teachrouter.post("/addProfile", verifyUserToken, async (req, res) => {
  if (req.loginRole === "teacher") {
    try {
      const generateTeacherId = async () => {
        const result = await connection.query(
          `SELECT COUNT(*) FROM "Teachers"`
        );
        const count = parseInt(result.rows[0].count) + 1;
        return `TR${1000 + count}`;
      };

      const {
        user_id,
        teacher_name,
        qualification,
        department,
        experience_years,
      } = req.body;

      const teacher_id = await generateTeacherId();

      const insertQuery = `
        INSERT INTO "Teachers" 
          (user_id, teacher_id, teacher_name, qualification, department, experience_years)
        VALUES
          ($1, $2, $3, $4, $5, $6)
      `;

      await connection.query(insertQuery, [
        user_id,
        teacher_id,
        teacher_name,
        qualification,
        department,
        experience_years,
      ]);

      res
        .status(201)
        .json({ message: "Teacher added successfully", teacher_id });
      console.log("Teacher added");
    } catch (error) {
      console.error("Error adding teacher:", error.message);
      res.status(500).json({ error: "Failed to add teacher" });
    }
  } else {
    res.status(403).send("Unauthorized access");
    console.log("Invalid access");
  }
});

teachrouter.patch("/updateProfile", verifyUserToken, async (req, res) => {
  if (req.loginRole === "teacher") {
    console.log("Req.Role, Req.Id: ", req.loginRole, req.loginId);

    try {
      const userIdResult = await connection.query(
        `SELECT user_id FROM "Users" WHERE email = $1`,
        [req.loginId]
      );
      const user_id = userIdResult.rows[0]?.user_id;
      console.log("DB Data: ", user_id);

      if (!user_id) {
        return res.status(404).json({ error: "User not found" });
      }

      const { qualification, department, experience_years } = req.body;

      const updateQuery = `UPDATE "Teachers" SET 
        qualification = $1,
        department = $2,
        experience_years = $3,
        WHERE user_id = $6`;

      await connection.query(updateQuery, [
        qualification,
        department,
        experience_years,
        user_id,
      ]);

      res.status(200).json({ message: "Teacher profile updated successfully" });
    } catch (error) {
      console.error("Update error:", error.message);
      res.status(500).json({ error: "Failed to update teacher data" });
    }
  } else {
    res.status(403).send("Unauthorized access");
    console.log("Invalid access");
  }
});

teachrouter.get("/getProfileDetails", async (req, res) => {
 
  try {
    const name = req.query.name;
    const fetchquery = `SELECT * FROM "Teachers" WHERE teacher_name = $1`;

    const fetchresult = await connection.query(fetchquery, [name]);

    res.status(200).json({ teachers: fetchresult.rows });
  } catch (error) {
    console.error("Error fetching teacher details:", error.message);
    res.status(500).json({ error: "Failed to fetch teacher details" });
  }
});

// teachrouter.get("/getTeacherNames", verifyUserToken, async (req, res) => {
//   try {
//     const result = await connection.query(`SELECT teacher_id, qualification FROM teachers`);
//     // or fetch name from users joining teachers if needed
//     res.status(200).json({ teachers: result.rows });
//   } catch (error) {
//     console.error("Error fetching teacher names:", error.message);
//     res.status(500).json({ error: "Failed to fetch teacher names" });
//   }
// });

export default teachrouter;
