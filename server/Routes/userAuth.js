import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connection } from "../main.js";

const authrouter = Router();

authrouter.post("/signup", async (req, res) => {
  const { name, email, password, course } = req.body;

  try {
    const userQuery = `SELECT * FROM "Users" WHERE email = $1`;
    const result = await connection.query(userQuery, [email]);

    if (result.rows.length === 0) {

      console.log("User not registered");
      return res
        .status(404)
        .json({ message: "User not pre-registered. Contact admin." });
    }

    const user = result.rows[0];

    if (user.Password && user.Password !== "Temp@123") {

      console.log("User already registered");
      return res
        .status(400)
        .json({ message: "User already registered. Please login." });
    }

    if (user.name !== name || user.course !== course) {
      
      console.log("User details do not match");
      return res
        .status(400)
        .json({ message: "Provided details do not match our records." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateQuery = `UPDATE "Users" SET password = $1 WHERE email = $2`;
    await connection.query(updateQuery, [hashedPassword, email]);

    console.log("Signup success");
    return res
      .status(200)
      .json({ message: "Signup completed successfully. You can now login." });
  } 
  catch (error) {
    
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM "Users" WHERE email = $1';
  const values = [email];

  try {
    const result = await connection.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.email, userRole: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

authrouter.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

export default authrouter;
