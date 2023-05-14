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
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
import Table from './Table'
import Calender from './Calender'
import Data from './Data'
import { makeStyles } from "@material-ui/core/styles";
import Date from "./Datepicker"
import Popup from './Popup'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "100%",
    },
    table: {
      minWidth: 650,
    },
    formControl: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }));


const Attendance =() =>
{
    const classes = useStyles();
  
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [courseId, setCourseId] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleCourseIdChange = (event) => {
        setCourseId(event.target.value);
    };

    const handleFacultyIdChange = (event) => {
        setFacultyId(event.target.value);
    };

    const fetchData =  async () => {
        const loginQuery = `SELECT * FROM Attendance WHERE courseid = ${courseId} AND facultyid = ${facultyId} AND date >= ${startDate} AND date <= ${endDate}`;
        const loginRequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: loginQuery}),
        // mode: 'cors',
        };
    
        // Define mysql localhost url
        const URL = 'http://localhost:5000/attendance';
        console.log(loginRequestOptions)
        try {
        const resp = await fetch(URL, loginRequestOptions);
        const data = await resp.json();
        console.log(data);
        // if (data.success) {
        //   // Handle successful response
        // } else {
        //   showError();
        // }
        if (data[1].success){
            console.log(data)        
        }
        else{
            // showError();
            // setIsLogin(true);
        }
        } catch (e) {
        // showError();
        }
    };

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
        <div className={classes.root}>
        <Popup />
        <FormControl className={classes.formControl} sx={{m:1,minWidth: 120,}}>
          <InputLabel id="course_id_label">Course ID</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-required"
            autoWidth
            // value={course_id}
            onChange={(e) => setCourseId(e.target.value)}
          >
            {Data.map((course) => (
              <MenuItem value={course.CourseId}>
                {course.CourseId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} sx={{m:1,minWidth: 120,}}>
          <InputLabel id="faculty_id_label">Faculty ID</InputLabel>
          <Select
            labelId="faculty_id_label"
            id="demo-simple-select-required"
            // value={faculty_id}
            onChange={(e) => setFacultyId(e.target.value)}
          >
            {Data.map((faculty) => (
              <MenuItem key={faculty.FacultyId} value={faculty.FacultyId}>
                {faculty.FacultyId}
              </MenuItem>
            ))} 
          </Select>
        </FormControl>
        {/* <FormControl className={classes.formControl} sx={{m:1,minWidth: 120,}}>
          <InputLabel id="demo-simple-select-autowidth-label">Start Date</InputLabel>
          <Select
            labelId="start_date_label"
            id="start_date"
            autoWidth
            // value={start_date}
            // onChange={(e) => setStartDate(e.target.value)}
          >
            {Data.map((date) => (
              <MenuItem key={date.start_date} value={date.start_date}>
                {date.start_date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} sx={{m:1,minWidth: 120,}}>
          <InputLabel >End Date </InputLabel>
          <Select
            labelId="end_date_label"
            id="end_date"
            // value={end_date}
            // onChange={(e) => setEndDate(e.target.value)}
          >
            {Data.map((date) => (
              <MenuItem key={date.end_date} value={date.end_date}>
                {date.end_date}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
 
        
    
      <Date label="Enter Start Date"/>
      <Date label="Enter End Date" /> <br />
      <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
          sx={{m:1,minWidth: 120,}}
          // onSubmit={}
        >
          Submit
       </Button><br /> <br/>
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
            <Table data={Data} />
        </Grid>
        <Grid item xs={12} md={4}>
            <Calender />
        </Grid>
        </Grid>
        </div> 
    );
}

export default Attendance;