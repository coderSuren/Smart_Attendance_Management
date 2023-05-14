import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core'

import ViewAttendance from './ViewAttendance';
// import ApplyOD from './ApplyOd';
// import ViewProfile from '/ViewProfile';
import EnterAttendance from './EnterAttendance';


// For reference. Already defined in Student.js.
// const [isAttendanceEntrySelected, setAttendanceEntrySelected] = React.useState(null);
// const [isAttendanceViewSelected, setAttendanceViewSelected] = React.useState(null);
// const [isODApplicationSelected, setODApplicationSelected] = React.useState(null);
// const [isProfileViewSelected, setProfileViewSelected] = React.useState(null);

function RenderDashboard({currentPage}) {

  console.log(currentPage.currentPage);
  if (currentPage.currentPage === "View Attendance") {
    return <>
      <ViewAttendance />
    </>
  }
  else if (currentPage.currentPage === "Enter Attendance") {
    return <>
      <EnterAttendance />
    </>
  }
}
export default RenderDashboard;