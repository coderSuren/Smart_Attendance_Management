import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, FormLabel } from '@mui/material';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const UserInputField = styled(Button)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 1, 3, 1),
  marginTop: theme.spacing(1),
}));

function CreateStudent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [section, setSection] = useState('');
  const [studentID, setStudentID] = useState('');
  const [specialization, setSpecialization] = useState('Default');
  const [semester, setSemester] = useState('Default');

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="m">
        <h2>Create Student</h2>
        <Paper>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              fullWidth
              color="secondary"
              type="password"
              value={password}
              error={passwordError}
            />
            <Box sx={{ marginTop: '10px' }} />
            <TextField
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="FirstName"
              value={firstName}
              fullWidth
            />
            <Box sx={{ marginTop: '10px' }} />
            <TextField
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="LastName"
              value={lastName}
              fullWidth
            />
            <Box sx={{ marginTop: '10px' }} />
            <TextField
              label="Student ID"
              onChange={(e) => setStudentID(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="StudentID"
              value={studentID}
              fullWidth
            />
            <Box sx={{marginTop: '10px' }} />
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
                                <em>Select Semester</em>
                            </MenuItem>
                            <MenuItem value="option1">'A'</MenuItem>
                            <MenuItem value="option2">'B'</MenuItem>
                            <MenuItem value="option3">'C'</MenuItem>
                            <MenuItem value="option4">'D'</MenuItem>
                            <MenuItem value="option5">'E'</MenuItem>
                            <MenuItem value="option6">'F'</MenuItem>
                            <MenuItem value="option7">'G'</MenuItem>
                            <MenuItem value="option8">'H'</MenuItem>
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
                            <MenuItem value="option1">1</MenuItem>
                            <MenuItem value="option2">2</MenuItem>
                            <MenuItem value="option3">3</MenuItem>
                            <MenuItem value="option4">4</MenuItem>
                            <MenuItem value="option5">5</MenuItem>
                            <MenuItem value="option6">6</MenuItem>
                            <MenuItem value="option7">7</MenuItem>
                            <MenuItem value="option8">8</MenuItem>
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
                    <UserInputField variant="outlined" color="secondary" type="submit" >Create Account</UserInputField>
                </Form>
            </Paper>
        </Container>
    </>
  );
}
export default CreateStudent;