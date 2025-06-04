// import createCourseTable from './courseModel.js'
// import createBatchTable from './batchModels.js';
import createTeachrTable from './teacherModels.js';
// import createstudentTable from './studentModels.js';
import { connection } from "../main.js";

const init = async () => {
//   await createCourseTable(connnection);
  // await createBatchTable(connnection);
  await createTeachrTable(connection)
  // await createstudentTable(connnection)
  process.exit(); 
};

init();