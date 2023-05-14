import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import CreateStudent from './CreateStudent';
import CreateCourse from './CreateCourse';
import CreateFaculty from './CreateFaculty';
import QueryDatabase from './QueryDatabase';
import CreateClass from './CreateClass';
import CreateAdmin from './CreateAdmin';
import AssignStudentToClass from './AssignStudentToClass';

// For reference. Already defined in Admin.js.
// const viewDatabaseOptions = ['View Students', 'View Faculty', 'View Courses'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// const createDatabaseEntryOptions = ['Create Student', 'Create Class', 'Create Faculty', 'Create Admin', 'Assign student to class'];

const MainBox = styled(Box)(({ theme }) => ({
  p: theme.spacing(3),
}));

function RenderDashboard(currentPage) {
  console.log(currentPage.currentPage);

  if (currentPage.currentPage === "View Students") {
    return (
      <MainBox>
        <Typography>
          View Students
        </Typography>
      </MainBox>
    );
  } else if (currentPage.currentPage === "View Faculty") {
    return (
      <MainBox>
        <Typography>
          View Faculty
        </Typography>
      </MainBox>
    );
  } else if (currentPage.currentPage === "View Courses") {
    return (
      <MainBox>
        <Typography>
          View Courses
        </Typography>
      </MainBox>
    );
  } else if (currentPage.currentPage === "Query Database") {
    return <QueryDatabase />;
  } else if (currentPage.currentPage === "Create Student") {
    return <CreateStudent />;
  } else if (currentPage.currentPage === "Create Course") {
    return <CreateCourse />;
  } else if (currentPage.currentPage === "Create Faculty") {
    return <CreateFaculty />;
  } else if (currentPage.currentPage === "Create Class") {
    return <CreateClass />;
  } else if (currentPage.currentPage === "Assign student to class") {
    return <AssignStudentToClass />;
  } else if (currentPage.currentPage === "Create Admin") {
    return <CreateAdmin />;
  }
}

export default RenderDashboard;
