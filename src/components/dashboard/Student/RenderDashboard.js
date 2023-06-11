import * as React from 'react';

import ViewAttendance from './ViewAttendance';
// import ViewProfile from '/ViewProfile';
import EnterAttendance from './EnterAttendance';
import ApplyOD from './ApplyOd';

function RenderDashboard({currentPage,id}) {

  console.log(currentPage);
  if (currentPage === "View Attendance") {
    return <>
      <ViewAttendance />
    </>
  }
  else if (currentPage === "Enter Attendance") {
    return <>
      <EnterAttendance id={id}/>
    </>
  }

  else if (currentPage === "Apply OD") {
    return <>
      <ApplyOD />
    </>
  }
}
export default RenderDashboard;