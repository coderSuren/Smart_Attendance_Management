import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@material-ui/core';
import { FormControl, FormLabel } from '@mui/material';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { Stack, InputLabel, Select } from '@mui/material';
import { makeStyles } from '@material-ui/core'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    userInputField: {
        width: '100%',
        margin: theme.spacing(1, 1, 3, 1),
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function CreateStudent() {
    const classes = useStyles();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false)
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false)
    const [section, setSection] = React.useState('');
    const [studentID, setStudentID] = React.useState('');
    const [specialization, setSpecialization] = React.useState('Default');
    const [semester, setSemester] = React.useState('Default');
    const [invalidQuery, setInvalidQuery] = React.useState(false);
    const [inserted, setinserted] = React.useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault()

        const queryOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
// -- VALUES ('S011', 'cb.en.u4cse20666@cb.students.amrita.edu', 'Tarun', 'R', 'password5', 'B',1,  'CSE');
            body:JSON.stringify({query:`INSERT INTO Student (student_id, email, first_name, last_name, password, section, semester,specialization) VALUES ('${studentID}', '${email}', '${firstName}', '${lastName}', '${password}', '${section}','${semester}','${specialization}');`})
          };
      
          // Validation for course code and course title.
        //   if (courseCode ==="" || courseTitle === "") {
        //     setInvalidQuery(true);
        //   }
          console.log(queryOptions);
      
          // Define mysql localhost URL   
          const URL = 'http://localhost:5000/admin';
      
          try {
            const resp = await fetch(URL, queryOptions);
            const data = await resp.json();
            console.log(data)
            // var columnHeadings = Object.keys(data[0]);
            // console.log(columnHeadings,"hguh")
            if (data.affectedRows) {    
            
                setinserted(true);
            }
            else {
                  setInvalidQuery(true);
            }
      
          } catch (e) {
      
            // setInvalidQuery(true);
            console.log(e);
      
      
            console.log("INVALID QUERY WAS ENTERED");
      
          }
    }

    return <>
        <Container component="main" maxWidth="m">
            <h2>Create Student</h2>
            <div className={classes.paper}>
                <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="email"

                        value={email}
                        error={emailError}
                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        type="password"
                        value={password}
                        error={passwordError}

                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <Stack spacing={2} direction="row">
                        <TextField
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="FirstName"
                            value={firstName}

                            fullWidth

                        />
                        <TextField
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            required
                            variant="outlined"

                            color="secondary"
                            type="LastName"
                            value={lastName}
                            fullWidth

                        />
                    </Stack>
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Student ID"
                        onChange={e => setStudentID(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="StudentID"
                        value={studentID}
                        fullWidth

                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <Stack spacing={3} direction="row">
                    <Select
                            labelId="select-option-label"
                            id="select-option"
                            defaultValue='Select Section'
                            value={section}
                            fullWidth
                            onChange={(event) => {setSection(event.target.value);}}
                            label="Select Section"
                        >
                            <MenuItem value="Default">
                                <em>Select Section</em>
                            </MenuItem>
                            <MenuItem value="A">'A'</MenuItem>
                            <MenuItem value="B">'B'</MenuItem>
                            <MenuItem value="C">'C'</MenuItem>
                            <MenuItem value="D">'D'</MenuItem>
                            <MenuItem value="E">'E'</MenuItem>
                            <MenuItem value="F">'F'</MenuItem>
                            <MenuItem value="G">'G'</MenuItem>
                            <MenuItem value="H">'H'</MenuItem>
                        </Select>
                                                <Select
                            labelId="select-option-label"
                            id="select-option"
                            defaultValue='Select Semester'
                            value={semester}
                            fullWidth
                            onChange={(event) => {setSemester(event.target.value);}}
                            label="Select Semester"
                        >
                            <MenuItem value="Default">
                                <em>Select Semester</em>
                            </MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                        </Select>
                        <Select
                            labelId="select-option-label"
                            id="select-option"
                            defaultValue='Select Specialization'
                            value={specialization}
                            fullWidth
                            onChange={(event) => {setSpecialization(event.target.value);}}
                            label="Select Specialization"
                        >
                            <MenuItem value="Default">
                                <em>Select Specialization</em>
                            </MenuItem>
                            <MenuItem value="option1">CSE</MenuItem>
                            <MenuItem value="option2">MEE</MenuItem>
                            <MenuItem value="option3">ECE</MenuItem>
                        </Select>
                    </Stack>
                    <Button variant="outlined" color="secondary" type="submit" classes={classes.userInputField}>Create Account</Button>
                </form>
            </div>
        </Container>
        <Dialog open={invalidQuery} onClose={() => { setInvalidQuery(false); setinserted(false); }}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid Query. Please check and try again.
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
            Entry stored in database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setInvalidQuery(false); setinserted(false);}} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>

}
export default CreateStudent;