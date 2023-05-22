import React, { useState, useEffect } from 'react';
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [time, settime] = useState('');
  const [subject, setsubject] = useState('');
  const [enteredcaptcha, setenteredcaptcha] = useState('');
  const [section, setSection] = useState('');
  const [isCodeGenerated, setIsCodeGenerated] = useState(false); // new state variable
  const [calendarKey, setCalendarKey] = useState(Date.now()); // Initialize the calendarKey state

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
    if (isFormValid && captcha === enteredcaptcha) {
      const subject1 = subject;
      const timeSlot1 = time;
      const section1 = section;
      const startTime = moment(timeSlot1.split(" - ")[0], "H:mm")._i;
      const endTime = moment(timeSlot1.split(" - ")[1], "H:mm")._i;
      
      const newCode = generateRandomCode();
      setCode(newCode);
      setCodeDisplay(newCode);
      setIsCodeGenerated(true); // Set the flag to indicate code generation
      
      const newEvent = {
        title: `${subject1} - ${timeSlot1}`,
        start: startTime,
        end: endTime,
      };
      setEvents([...events, newEvent]);
    } else {
      alert("Please fill in the required fields and enter the correct captcha!");
    }
  }

  useEffect(() => {
    setCalendarKey(Date.now()); // Update the key with the current timestamp
  }, [events]);

  function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  function handleFormChange() {
    const timeSlot = time;
    if (subject && timeSlot && section) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  async function saveClass() {
    if (isFormValid && captcha === enteredcaptcha) {
      const subject1 = subject;
      const timeSlot1 = time;
      const startTime = moment(timeSlot1.split(' - ')[0], 'H:mm')._i;
      const endTime = moment(timeSlot1.split(' - ')[1], 'H:mm')._i;
  
      // Add the new event to the calendar
      const newEvent = {
        title: `${subject1} - ${timeSlot1}`,
        start: startTime,
        end: endTime,
      };
      setEvents([...events, newEvent]); // Update the events state
  
      try {
        // Make the API call to save the class
        const response = await fetch('http://localhost:5000/addclassschedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: subject1,
            time: timeSlot1,
            startPeriod: startTime,
            endPeriod: endTime,
          }),
        });
  
        // Check the response status
        if (response.ok) {
          // Clear the form fields and captcha
          setsubject('');
          settime('');
          setSection('');
          setenteredcaptcha('');
  
          // Reset the captcha
          generateCaptcha();
  
          // Reset the code display
          setCode('');
          setCodeDisplay('No code generated yet');
          setIsCodeGenerated(false);
  
          // Reset the form validation
          setIsFormValid(false);
  
          // Refresh the calendar by updating the calendar key
          setCalendarKey(Date.now());
  
          // Show a success message
          alert('Class saved successfully!');
        } else {
          // Show an error message
          alert('Failed to save class. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        // Show an error message
        alert('Failed to save class. Please try again.');
      }
    } else {
      alert('Please fill in the required fields and enter the correct captcha!');
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
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel id="Subject">Subject</InputLabel>
                  <Select labelId="Subject" id="subject" value={subject} onChange={(e) => setsubject(e.target.value)} style={{ width: '200px' }}>
                    <MenuItem value="19CSE311">19CSE311</MenuItem>
                    <MenuItem value="19CSE312">19CSE312</MenuItem>
                    <MenuItem value="19CSE313">19CSE313</MenuItem>
                    <MenuItem value="19CSE314">19CSE314</MenuItem>
                    <MenuItem value="19CSE435">19CSE435</MenuItem>
                    <MenuItem value="19ECE343">19ECE343</MenuItem>
                    <MenuItem value="19EEE112">19EEE112</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <br></br>
          <div>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography className={classes.captchaLabel}>Select Timeslot:</Typography>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel id="time-label">Time Slot</InputLabel>
                  <Select labelId="time-label" id="time" value={time} onChange={(e) => settime(e.target.value)} style={{ width: '200px' }}>
                    <MenuItem value="8:00 - 9:00">8:00 - 9:00</MenuItem>
                    <MenuItem value="9:00 - 10:00">9:00 - 10:00</MenuItem>
                    <MenuItem value="10:00 - 11:00">10:00 - 11:00</MenuItem>
                    <MenuItem value="11:00 - 12:00">11:00 - 12:00</MenuItem>
                    <MenuItem value="13:00 - 14:00">13:00 - 14:00</MenuItem>
                    <MenuItem value="14:00 - 15:00">14:00 - 15:00</MenuItem>
                    <MenuItem value="15:00 - 16:00">15:00 - 16:00</MenuItem>
                    <MenuItem value="16:00 - 17:00">16:00 - 17:00</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography className={classes.captchaLabel}>Select Section:</Typography>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel id="section-label">Section</InputLabel>
                  <Select
                    labelId="section-label"
                    id="section"
                    value={section}
                    onChange={(e) => {
                      setSection(e.target.value);
                      handleFormChange(); // Trigger form validation on section selection
                    }}
                    style={{ width: '200px' }}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
                <TextField id="captcha" label="Captcha" required value={enteredcaptcha} onChange={(e) => { handleFormChange(); setenteredcaptcha(e.target.value) }} />
              </Grid>
            </Grid>
          </div>
          <Button className={classes.button} onClick={generateCode} variant="contained" color="primary" disabled={!isFormValid}>Generate Code</Button><br></br>
          <div className="code-display">
            <h2>Generated Code:</h2>
            <p>{codeDisplay}</p>
          </div>
          {isCodeGenerated && (
            <Button className={classes.button} onClick={saveClass} variant="contained" color="primary">Save Class</Button>
          )}
        </form>

        <div style={{ flex: 5.5 }}>
        <AppBar style={{ position: "static" }} className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6">Calendar</Typography>
          </Toolbar>
        </AppBar>
        <Calendar
          key={calendarKey} // Add the key prop to the Calendar component
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      </div>
    </div>
  );
}

export default Faculty;
