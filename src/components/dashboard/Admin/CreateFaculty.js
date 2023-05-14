import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';

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

function CreateFaculty() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [teacherID, setTeacherID] = useState('');
  const [teacherRole, setTeacherRole] = useState('Default');

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
        <h2>Create Faculty / Teacher</h2>
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
              label="Teacher ID"
              onChange={(e) => setTeacherID(e.target.value)}
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
              <MenuItem value="option1">Principal</MenuItem>
              <MenuItem value="option2">Assistent Professor</MenuItem>
              <MenuItem value="option3">Professor</MenuItem>
          </Select>
          <UserInputField variant="outlined" color="secondary" type="submit">Create Account</UserInputField>
      </Form>
  </Paper>
</Container>
</>);
}
export default CreateFaculty;
