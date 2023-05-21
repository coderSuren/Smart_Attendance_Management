import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

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

function AssignStudentToClass() {
    const classes = useStyles();

    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false)
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false)
    const [section, setSection] = React.useState('');
    const [studentID, setStudentID] = React.useState('');
    const [courseCode, setCourseCode] = React.useState('');
    const [assignedTeacherID, setAssignedTeacherID] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }

        if (email && password) {
            console.log(email, password)
        }
    }

    return <>
        <Container component="main" maxWidth="m">
            <h2>Assign Students To Class</h2>
            <div className={classes.paper}>
                <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        label="Course Code"
                        onChange={e => setCourseCode(e.target.value)}
                        required
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="courseCode"

                        value={courseCode}
                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Section"
                        onChange={e => setSection(e.target.value)}
                        required
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        type="section"
                        value={section}
                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Assigned Teacher ID"
                        onChange={e => setAssignedTeacherID(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="AssignedTeacherID"
                        value={assignedTeacherID}
                        fullWidth

                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Student ID"
                        onChange={e => setStudentID(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="studentID"
                        value={studentID}
                        fullWidth
                    />
                    <Button variant="outlined" color="secondary" type="submit" classes={classes.userInputField}>Assign Student To Class</Button>
                </form>
            </div>
        </Container>
    </>
}
export default AssignStudentToClass;