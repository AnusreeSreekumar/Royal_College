import { connection } from '../main.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Admin user details with default values
const adminDetails = {
  name: process.env.ADMIN_NAME || 'Admin User',
  email: process.env.ADMIN_EMAIL || 'admin@royalcollege.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  role: 'admin'  // Role is fixed as 'admin'
};

async function createAdminUser() {
  try {
    // Validate required fields
    if (!adminDetails.email || !adminDetails.password || !adminDetails.name) {
      throw new Error('Name, email and password are required for admin user');
    }

    // Check if admin user already exists
    const checkQuery = 'SELECT * FROM "Users" WHERE Email = $1';
    const existingUser = await connection.query(checkQuery, [adminDetails.email]);
    
    if (existingUser.rows.length > 0) {
      console.log('Admin user already exists with email:', adminDetails.email);
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminDetails.password, 10);
    
    // Insert admin user into Users table - letting PostgreSQL handle the User Id
    const insertQuery = `
      INSERT INTO "Users" (Name, Email, Password, Course, Role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING User_Id, Name, Email, Role
    `;
    
    const values = [
      adminDetails.name,
      adminDetails.email,
      hashedPassword,
      null, // Course is null for admin
      adminDetails.role
    ];
    
    const result = await connection.query(insertQuery, values);
    console.log('Admin user created successfully:');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    // Close the database connection
    await connection.end();
  }
}

// Execute the function
createAdminUser();