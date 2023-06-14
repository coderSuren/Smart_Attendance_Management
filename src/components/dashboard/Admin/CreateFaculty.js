import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
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

function CreateFaculty() {
    const classes = useStyles();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false)
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false)
    const [section, setSection] = React.useState('');
    const [inserted, setinserted] = React.useState(false);
    const [teacherID, setTeacherID] = React.useState('');
    const [invalidQuery, setInvalidQuery] = React.useState(false);
    const [teacherRole, setTeacherRole] = React.useState('Default');

    const handleSubmit = async(event) => {
        event.preventDefault()

        const queryOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ query: "INSERT INTO Course (course_code, course_title) VALUES (" + "'"
            //  + courseCode + "', '" +  + courseTitle + "');"}),
            body:JSON.stringify({query:`INSERT INTO Faculty (teacher_id, email, first_name, last_name, password, role) VALUES ('${teacherID}', '${email}', '${firstName}', '${lastName}', '${password}', '${teacherRole}');`})
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
            <h2>Create Faculty / Teacher</h2>
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
                        label="Teacher ID"
                        onChange={e => setTeacherID(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="StudentID"
                        value={teacherID}
                        fullWidth

                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <Select
                        labelId="select-option-label"
                        id="select-option"
                        defaultValue='Select Course'
                        value={teacherRole}
                        fullWidth
                        onChange={(event) => {setTeacherRole(event.target.value);}}
                        label="Select Role"
                    >
                        <MenuItem value="Default">
                            <em>Select Role</em>
                        </MenuItem>
                        <MenuItem value="Principal">Principal</MenuItem>
                        <MenuItem value="Assistent Professor">Assistent Professor</MenuItem>
                        <MenuItem value="Professor">Professor</MenuItem>
                    </Select>
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

export default CreateFaculty;