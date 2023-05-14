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

function CreateClass() {
  const [courseCode, setCourseCode] = useState('');
  const [assignedTeacherID, setAssignedTeacherID] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (courseCode === '') {
      console.log('Course Code is required');
      return;
    }
    if (assignedTeacherID === '') {
      console.log('Assigned Teacher ID is required');
      return;
    }

    console.log(courseCode, assignedTeacherID);
  };

  return (
    <>
      <StyledContainer component="main" maxWidth="sm">
        <h2>Create Class</h2>
        <div>
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
              label="Assigned Teacher ID"
              onChange={(e) => setAssignedTeacherID(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="AssignedTeacherID"
              value={assignedTeacherID}
              fullWidth
            />
            <StyledButton variant="outlined" color="secondary" type="submit">
              Create Class
            </StyledButton>
          </StyledForm>
        </div>
      </StyledContainer>
    </>
  );
}

export default CreateClass;
