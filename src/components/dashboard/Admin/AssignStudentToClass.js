import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  margin: 24px 0 16px;
`;

function AssignStudentToClass() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [section, setSection] = useState('');
  const [studentID, setStudentID] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [assignedTeacherID, setAssignedTeacherID] = useState('');

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
      <StyledContainer component="main" maxWidth="sm">
        <h2>Assign Students To Class</h2>
        <Box sx={{ marginTop: '16px' }} />
        <StyledForm autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Course Code"
            onChange={(e) => setCourseCode(e.target.value)}
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
            onChange={(e) => setSection(e.target.value)}
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
            onChange={(e) => setAssignedTeacherID(e.target.value)}
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
            onChange={(e) => setStudentID(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="studentID"
            value={studentID}
            fullWidth
          />
          <StyledButton variant="outlined" color="secondary" type="submit">
            Assign Student To Class
          </StyledButton>
        </StyledForm>
      </StyledContainer>
    </>
  );
}

export default AssignStudentToClass;
