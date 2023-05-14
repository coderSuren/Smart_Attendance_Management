import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core'

import ViewAttendance from './ViewAttendance';
// import ApplyOD from './ApplyOd';
// import ViewProfile from '/ViewProfile';
import EnterAttendance from './EnterAttendance';
import ApplyOD from './ApplyOd';


// For reference. Already defined in Student.js.
// const [isAttendanceEntrySelected, setAttendanceEntrySelected] = React.useState(null);
// const [isAttendanceViewSelected, setAttendanceViewSelected] = React.useState(null);
// const [isODApplicationSelected, setODApplicationSelected] = React.useState(null);
// const [isProfileViewSelected, setProfileViewSelected] = React.useState(null);

function RenderDashboard({currentPage}) {

  console.log(currentPage);
  if (currentPage === "View Attendance") {
    return <>
      <ViewAttendance />
    </>
  }
  else if (currentPage === "Enter Attendance") {
    return <>
      <EnterAttendance />
    </>
  }

  else if (currentPage === "Apply OD") {
    return <>
      <ApplyOD />
    </>
  }
}
export default RenderDashboard;