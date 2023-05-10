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
    const [course, setCourse] = React.useState('Default');

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
                    <Stack spacing={2} direction="row">
                        <TextField
                            label="Section"
                            onChange={e => setSection(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="section"
                            value={section}
                            fullWidth
                        />
                        <Select
                            labelId="select-option-label"
                            id="select-option"
                            defaultValue='Select Course'
                            value={course}
                            fullWidth
                            onChange={setCourse}
                            label="Select Course"
                        >
                            <MenuItem value="Default">
                                <em>Select Course</em>
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
    </>

}
export default CreateStudent;