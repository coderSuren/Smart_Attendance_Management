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

  function generateCaptcha() {
    const newCaptcha = generateRandomCaptcha();
    setCaptcha(newCaptcha);
  }

  function generateRandomCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }

  function generateCode() {
    console.log(subject);
    console.log(time);
    // console.log("sdfgkf")
    console.log(enteredcaptcha)
    console.log(isFormValid)
    console.log(captcha)
    if (isFormValid && (captcha === enteredcaptcha)) {
      const subject1 = subject;
      const timeSlot1 = time;
      const startTime = moment(timeSlot1.split(" - ")[0], "H:mm")._i;
      const endTime = moment(timeSlot1.split(" - ")[1], "H:mm")._i;
      console.log(startTime)
      console.log(endTime)
      // Check if there are any events scheduled at the selected time slot
      // const hasOverlappingEvents = events.some(event => {
      //   const eventStartTime = moment(event.start);
      //   const eventEndTime = moment(event.end);
      //   console.log(eventStartTime)
      //   console.log(eventEndTime)
      //   //return (startTime.isBetween(eventStartTime, eventEndTime) || endTime.isBetween(eventStartTime, eventEndTime) || startTime.isSame(eventStartTime) || endTime.isSame(eventEndTime));
      // });
  
      // if (hasOverlappingEvents) {
      //   alert("There is already an event scheduled at the selected time slot!");
      // } 
      // else {
        const newCode = generateRandomCode();
        setCode(newCode);
        setCodeDisplay(newCode);
      
        // Create a new event with the generated code, subject, and timeslot
        const newEvent = {
          title: `${subject1} - ${timeSlot1}`,
          start: new Date(),
          end: new Date(),
        };
        setEvents([...events, newEvent]); // Add the new event to the events state
      // }
    }
     else {
      alert("Please fill in the required fields and enter the correct captcha!");
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
      // const subject = subject;
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
      <Button color="inherit">View Attendance</Button>
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
      <MenuItem value="Maths">Maths</MenuItem>
      <MenuItem value="English">English</MenuItem>
      <MenuItem value="Science">Science</MenuItem>
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
    <Button onClick={generateCaptcha} variant="outlined">Generate Captcha</Button>
  </Grid>
  <Grid container justifyContent="center">
    <Typography id="captchaDisplay" className={classes.captchaText}>{captcha}</Typography>
  </Grid>
  </div>
  <div className={classes.captcha}>

  <Grid container spacing={2} alignItems="center">
    <Grid item>
      <Typography className={classes.captchaLabel}>Enter Captcha:</Typography>
    </Grid>
    <Grid item>
      <TextField id="captcha" label="Captcha"  required value={enteredcaptcha}  onChange={(e)=>{handleFormChange();setenteredcaptcha(e.target.value)}} />
    </Grid>
  </Grid>
</div>
  <Button className={classes.button} onClick={generateCode} variant="contained" color="primary" disabled={!isFormValid}>Generate Code</Button><br></br>
  <div className="code-display">
        <h2>Generated Code:</h2>
        <p>{codeDisplay}</p>
      </div>  </form>
  
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




      </div>
      );
      }
      
export default Faculty;
