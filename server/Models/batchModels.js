import { connection } from "../main.js";

const createBatchTable = async () => {

    const query = `CREATE TABLE IF NOT EXISTS "Batch" (
    "BatchId" SERIAL PRIMARY KEY,
    "BatchName" VARCHAR NOT NULL UNIQUE,
    "CourseId" INT REFERENCES "Course"("CourseId"),
    "Year" INT,
    "StartDate" DATE,
    "EndDate" DATE)`

     try {
    await connection.query(query);
    console.log('Batch table created successfully.');
  } 
  catch (err) {
    console.error('Error creating Batch table:', err.message);
  }
};

export default createBatchTable;