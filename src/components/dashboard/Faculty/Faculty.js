import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  AppBar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import "mapbox-gl/dist/mapbox-gl.css";
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

var teacher_latitude, teacher_longitude;



const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  appBar: {
    display: 'flex',
    width: '100%',
  },
  appBar1: {
    display: 'flex',
    width: '80%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  captcha: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  captchaLabel: {
    marginRight: theme.spacing(2)
  },
  captchaText: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

function getLocation() {
  return new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}
getLocation()
  .then(function(position) {
    teacher_latitude = position.coords.latitude;
    teacher_longitude = position.coords.longitude;
  })
  .catch(function(error) {
    console.log(error);
  });

function Faculty() {
  
  const classes = useStyles();
  const [captcha, setCaptcha] = useState('');
  const [code, setCode] = useState('');
  const [codeDisplay, setCodeDisplay] = useState('No code generated yet');
  const [events, setEvents] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false); // new state variable
  const [time,settime] = useState('')
  const [subject,setsubject] = useState('')
  const [enteredcaptcha,setenteredcaptcha] = useState()
  const [invalidQuery, setInvalidQuery] = useState(false);
  const [inserted, setinserted] = React.useState(false);
  const [enablecsv, setenablecsv] = useState(false)
  function generateCaptcha() {
    const newCaptcha = generateRandomCaptcha();
    setCaptcha(newCaptcha);
  }

  function generateRandomCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 8; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }

  //csv part
  const handleDownloadCSV = async () => {
    const downloadData = []; // Array to store the CSV data

    const date = new Date();


    let day ='' + date.getDate();
    let month ='' + (date.getMonth()+1);
    console.log(typeof(date.getMonth()));
    
    let year = date.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    }

    if (month.length < 2) {
      month = '0' + month;
    }

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`; 
    const attendanceQuery = `SELECT course_code, class_date, student_id, attendance 
    FROM Student_Attendance 
    WHERE course_code = "${subject}" 
    AND class_date = "${currentDate}"`;
    console.log(attendanceQuery);

    var attendanceQueryOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: attendanceQuery }),
    };

        try {
        // Fetch the data from the database using an appropriate API endpoint
        const response = await fetch('http://localhost:5000/admin', attendanceQueryOptions); // Replace API_ENDPOINT with the appropriate URL

        if (response.ok) {
          const data = await response.json();

          console.log(data);
          if (Array.isArray(data)) {
            // Process the retrieved data and add it to the downloadData array
            data.forEach((item) => {
              downloadData.push({
                course_code: item.course_code,
                class_date: item.class_date,
                student_id: item.student_id,
              });
            });

            // Convert the downloadData array to CSV format using PapaParse
            const csv = Papa.unparse(downloadData);

            // Create a Blob object with the CSV data
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

            // Save the Blob as a file using FileSaver.js
            saveAs(blob, 'attendance.csv');
          } else {
            console.log('Invalid data format. Expected an array.');
          }
        } else {
          console.log('Failed to fetch data from the server.');
        }
      } catch (error) {
        console.log('Error:', error);
      }
      };

  const storeCoordsInDatabase = async() => {
      // Get the next event ID.
      
      var maxEvent = 0;
      const maxEventIdQuery = 'SELECT MAX(event_id) FROM Event';
      var maxEventIdQueryOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: maxEventIdQuery }),
      };


      // Define mysql localhost URL
      const URL = 'http://localhost:5000/admin';

      try {
        const resp = await fetch(URL, maxEventIdQueryOptions);
        const data = await resp.json();
        console.log(data[0]["MAX(event_id)"]);
        maxEvent = data[0]["MAX(event_id)"] + 1;
      } catch (e) {
        console.log(e);
      }

      // Now store in DB.
      getLocation();
      console.log("Teacher lat and long : " + teacher_latitude  + " and " + teacher_longitude);

      // Get current date.
      const date = new Date();
      console.log(date,"is date")

      let day ='' + date.getDate();
      let month ='' + date.getMonth();
      
      let year = date.getFullYear();

      if (day.length < 2) {
        day = '0' + day;
      }

      if (month.length < 2) {
        month = '0' + month;
      }

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;  
      console.log(currentDate); // "17-6-2022"
      const createEventQuery = `INSERT INTO Class_Schedule (course_code, class_date, num_hours, start_period, end_period) VALUES ("${subject}", DATE "${currentDate}", 1, 0, 2)`;
      const createEventQuery1 = `INSERT INTO Event (event_id, course_code, class_date, random_code, teacher_latitude, teacher_longitude) VALUES (${maxEvent}, "${subject}", DATE "${currentDate}", "${captcha}", ${teacher_latitude}, ${teacher_longitude});`
                                                                                                                                                                                                                                                                  
      console.log(createEventQuery);
      var createEventQueryOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: createEventQuery, query1: createEventQuery1 }),
      };

      try {
        const resp = await fetch(URL, createEventQueryOptions);
        const data = await resp.json();
        console.log(data);
        if (data.affectedRows) {    
            
          setinserted(true);
          setenablecsv(true);
        }
        else {
          setInvalidQuery(true)
        }
      } catch (e) {
        console.log(e);
      }

    }


  
  

  function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i= 0; i < 6; i++) { // change to 6 characters for stronger code
      code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return code;
      }
      
      function handleFormChange() {

      const timeSlot = time;
      if (subject && timeSlot) {
      setIsFormValid(true);
      } else {
      setIsFormValid(false);
      }
      }
      
      return (
        <div>
      <AppBar position="static">
  <Toolbar style={{ justifyContent: "space-between" }}>
    <Typography variant="h6" className={classes.title}>
      SMART ATTENDANCE SYSTEM
    </Typography>
    <div>
      
      <Button color="inherit">Edit Attendance</Button>
      <Button color="inherit">Logout</Button>
    </div>
  </Toolbar>
</AppBar>
<div className={classes.container} style={{ display: "flex", height: "85vh" }}>
  
  <form className={classes.form} style={{ flex: 4.5 }} alignItems="center">
    <AppBar position="static" className={classes.appBar1} >
      <Toolbar>
        <Typography variant="h6">Code Generator</Typography>
      </Toolbar>
    </AppBar>
<div>
  <Grid container spacing={2} alignItems="center">
    <Grid item>
      <Typography className={classes.captchaLabel}>Select Subject:</Typography>
    </Grid><Grid item><FormControl>
    <InputLabel id="Subject">Subject</InputLabel>
    <Select labelId="Subject" id="subject" value={subject} onChange={(e)=>setsubject(e.target.value)} style={{ width: '200px' }}>
      <MenuItem value="19CSE311">19CSE311</MenuItem>
      <MenuItem value="19CSE312">19CSE312</MenuItem>
      <MenuItem value="19CSE313">19CSE313</MenuItem>
      <MenuItem value="19CSE456">19CSE456</MenuItem>
    </Select>
  </FormControl></Grid></Grid></div>
  <br></br>
  <div>
  <Grid container spacing={2} alignItems="center">
  <Grid item>
      <Typography className={classes.captchaLabel}>Select Timeslot:</Typography>
    </Grid>
    <Grid item>
  <FormControl>
    <InputLabel id="time-label">Time Slot</InputLabel>
    <Select labelId="time-label" id="time" value={time} onChange={(e)=>settime(e.target.value)} style={{ width: '200px' }}>
      <MenuItem value="8:00 - 9:00">8:00 - 9:00</MenuItem>
      <MenuItem value="9:00 - 10:00">9:00 - 10:00</MenuItem>
      <MenuItem value="10:00 - 11:00">10:00 - 11:00</MenuItem>
      <MenuItem value="11:00 - 12:00">11:00 - 12:00</MenuItem>
    </Select>
  </FormControl></Grid></Grid>
  </div>
  <br></br><br></br>
  <div className={classes.captcha}> 
  <Grid container justifyContent="center">    
    <Button onClick={generateCaptcha} variant="outlined">Generate Code</Button>
  </Grid>
  <Grid container justifyContent="center">
    <Typography id="captchaDisplay" className={classes.captchaText}>{captcha}</Typography>
  </Grid>
  </div>

  <Button className={classes.button} onClick={storeCoordsInDatabase} variant="contained" color="primary" >Save in database</Button><br></br>
  {/* <Button onClick={handleDownloadCSV} ariant="contained" color="primary" >Download CSV</Button> */}
  {enablecsv && <Button onClick={handleDownloadCSV} ariant="contained" color="primary" >Download CSV</Button>}
        </form>
  
  <div style={{ flex: 5.5 }}>
    <AppBar style={{ position: "static" }} className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">Calendar</Typography>
      </Toolbar>
    </AppBar>
<Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />  </div>
</div>

      <Dialog open={invalidQuery} onClose={() => { setInvalidQuery(false); setinserted(false); }}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setInvalidQuery(false); }} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={inserted} onClose={() => { setInvalidQuery(false); setinserted(false); }}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entry stored in database. Students can give their attendance now.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setInvalidQuery(false); setinserted(false);}} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>


      </div>
      );
      }
      
export default Faculty;
