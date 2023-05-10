import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core'

import CreateStudent from './CreateStudent';
import CreateCourse from './CreateCourse';
import CreateFaculty from './CreateFaculty';
import QueryDatabase from './QueryDatabase';
import CreateClass from './CreateClass';
import AssignStudentToClass from './AssignStudentToClass';

// For reference. Already defined in Admin.js.
// const viewDatabaseOptions = ['View Students', 'View Faculty', 'View Courses'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// const createDatabaseEntryOptions = ['Create Student', 'Create Class', 'Create Faculty', 'Assign student to class'];

function RenderDashboard(currentPage) {

  console.log(currentPage.currentPage);
  if (currentPage.currentPage === "View Students") {
    return <>
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          View Students
        </Typography>
      </Box>
    </>
  }
  else if (currentPage.currentPage === "View Faculty") {
    return <>
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          View Faculty
        </Typography>
      </Box>
    </>
  }

  else if (currentPage.currentPage === "View Courses") {
    return <>
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          View Courses
        </Typography>
      </Box>
    </>
  }
  else if (currentPage.currentPage === "Query Database") {
    return <>
      <QueryDatabase />
    </>
  }

  else if (currentPage.currentPage === "Create Student") {
    return <>
      <CreateStudent />
    </>
  }
  else if (currentPage.currentPage === "Create Course") {
    return <>
      <CreateCourse />
    </>
  }
  else if (currentPage.currentPage === "Create Faculty") {

    return <>
      <CreateFaculty />
    </>
  }

  else if (currentPage.currentPage === "Create Class") {
    return <>
      <CreateClass />
    </>
  }
  else if (currentPage.currentPage === "Assign student to class") {
    return <>
      <AssignStudentToClass />
    </>
  }
}
export default RenderDashboard;