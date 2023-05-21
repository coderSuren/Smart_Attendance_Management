import React,{ useState, useEffect } from 'react';
import{
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Grid,
    Select,
    FormControl, 
    InputLabel,
} from "@mui/material";

import RenderDashboard from './RenderDashboard'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// var currentPage="";
const Student = ({}) => {

  const [isAttendanceEntrySelected, setAttendanceEntrySelected] = React.useState(null);
  const [isAttendanceViewSelected, setAttendanceViewSelected] = React.useState(null);
  const [isODApplicationSelected, setODApplicationSelected] = React.useState(null);
  const [isProfileViewSelected, setProfileViewSelected] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState("");

  // const fetchData =  async () => {
  //   const loginQuery = `SELECT * FROM Attendance WHERE courseid = ${courseId} AND facultyid = ${facultyId} AND date >= ${startDate} AND date <= ${endDate}`;
  //   const loginRequestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ query: loginQuery}),
  //     // mode: 'cors',
  //   };
  
  //   // Define mysql localhost url
  //   const URL = 'http://localhost:5000/attendance';
  //   console.log(loginRequestOptions)
  //   try {
  //     const resp = await fetch(URL, loginRequestOptions);
  //     const data = await resp.json();
  //     console.log(data);
  //     // if (data.success) {
  //     //   // Handle successful response
  //     // } else {
  //     //   showError();
  //     // }
  //     if (data[1].success){
  //       console.log(data)        
  //     }
  //     else{
  //       // showError();
  //       // setIsLogin(true);
  //     }
  //   } catch (e) {
  //     // showError();
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []); // Fetch data on component mount
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch(
  //     `http://localhost:5000/attendance?course_id=${course_id}&faculty_id=${faculty_id}&start_date=${start_date}&end_date=${end_date}`
  //   );
  //   const data = await res.json();
  //   setAttendance(data);
  // };
  // const columns = ["Column 1", "Column 2", "Column 3"];
    return (
        <>       
        <AppBar position="static" display="flex"  sx={{backgroundColor: "#1976d2 !important" }}>
        <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.0rem',
                color: 'white !important',
                // backgroundColor: 'inherit',
                textDecoration: 'none',
            }}
            >
            Smart Attendance System
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button onClick={(event) => {
                setCurrentPage("Enter Attendance");
                setAttendanceEntrySelected(event.currentTarget);
                console.log(currentPage)}} 
                sx={{ my: 2, color: 'white !important', display: 'flex' }}
              >
                Enter Attendance
              </Button>
            
              <Button onClick={(event) => {
                setCurrentPage("View Attendance");
                setAttendanceViewSelected(event.currentTarget);
                console.log(currentPage)}} 
                sx={{ my: 2, color: 'white !important', display: 'flex' }}
                >
                View Attendance
              </Button>

              <Button onClick={(event) => {
                setCurrentPage("Apply OD");
                setODApplicationSelected(event.currentTarget);
                console.log(currentPage)}} 
                sx={{ my: 2, color: 'white !important', display: 'flex' }}
                >
                Apply OD
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(event) => {setProfileViewSelected(event.currentTarget);}} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={isProfileViewSelected}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(isProfileViewSelected)}
                onClose={() => {setProfileViewSelected(false);}}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {setProfileViewSelected(false);}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

        </Toolbar>
        </Container>
        </AppBar>
        <RenderDashboard currentPage={currentPage}/>
        </>
    );
} 

export default Student;