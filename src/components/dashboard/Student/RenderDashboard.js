import * as React from 'react';

import ViewAttendance from './ViewAttendance';
// import ViewProfile from '/ViewProfile';
import EnterAttendance from './EnterAttendance';
import ApplyOD from './ApplyOd';

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