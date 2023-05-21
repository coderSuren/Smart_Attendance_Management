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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const dayjs = require("dayjs")

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
    submitButton: {
      margin: theme.spacing(2),
    },
  }));

const Attendance =() =>
{
    const classes = useStyles();
    console.log(Data);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [courseId, setCourseId] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [tableData, setTableData] = useState([]);
    
  const [attendanceData, setAttendanceData] = useState([]);
    const handleCourseIdChange = (event) => {
        setCourseId(event.target.value);
    };

    const handleFacultyIdChange = (event) => {
        setFacultyId(event.target.value);
    };
    const handleStartDateChange = (date) => {
        let formattedDate = dayjs(date.$d).format('YYYY-MM-DD');
        setStartDate(formattedDate);
    };
    
    const handleEndDateChange = (date) => {
      let formattedDate = dayjs(date.$d).format('YYYY-MM-DD');
      setEndDate(formattedDate);
    };

    const fetchData =  async () => {
        // console.log(startDate);
        // console.log(endDate);
        const loginQuery = `SELECT * FROM Attendance WHERE courseid = '${courseId}' AND facultyid = '${facultyId}' AND date >= '${startDate}' AND date <= '${endDate}'`;
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
        setTableData(data);
        console.log(tableData);
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
            // value={course_id}
            onChange={(event) => handleCourseIdChange(event)}
          >
            {Data.map((course) => (
              <MenuItem 
                key={course.StudentID} 
                value={course.CourseID}
                style = {{ display: 'flex'}}
              >
                {course.CourseID}
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
            onChange={(event) => handleFacultyIdChange(event)}
          >
            {Data.map((faculty) => (
              <MenuItem 
                key={faculty.StudentID} 
                value={faculty.FacultyID} 
                style = {{ display: 'flex' }}
              >
                {faculty.FacultyID}
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
 
        
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Enter Start Date" sx={{m:1,minWidth: 120,}} onChange={(date) => handleStartDateChange(date)}/>
          <DatePicker label="Enter End Date" sx={{m:1,minWidth: 120,}} onChange={(date) => handleEndDateChange(date)}/>
          
      </LocalizationProvider>
      
      {/* <Date label="Enter End Date" onChange={(date) => setEndDate(date)} /><br/> */}
      <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
          sx={{m:1,minWidth: 120,}}
          onClick={(e) => {fetchData(); e.preventDefault();}}
        >
          Submit
       </Button> 
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
            <Table data={tableData} />
        </Grid>
        <Grid item xs={12} md={4}>
            <Calender />
        </Grid>
        </Grid>
        </div> 
    );
}

export default Attendance;