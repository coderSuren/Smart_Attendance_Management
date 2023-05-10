import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

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
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          Query Database
        </Typography>
      </Box>
    </>
  }

  else if (currentPage.currentPage === "Create Student") {
    return <>
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          Create Student
        </Typography>
      </Box>
    </>
  }
  else if (currentPage.currentPage === "Create Class") {
    return <>
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          Create Class
        </Typography>
      </Box>
    </>
  }
  else if (currentPage.currentPage === "Create Faculty") {
    return <>

      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          Create Faculty
        </Typography>
      </Box>
    </>
  }
  else if (currentPage.currentPage === "Assign student to class") {
    return <>
      <Box component="main" sx={{ p: 3 }}>
        <Typography>
          Assign student to class
        </Typography>
      </Box>
    </>
  }
  else {
    return <>
    <Box component="main" sx={{ p: 3 }}>
      <Typography>
        Query Database
      </Typography>
    </Box>
  </>
  }
}
export default RenderDashboard;