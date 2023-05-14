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

function CreateCourse() {
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (courseCode === '') {
      console.log('Course Code is required');
      return;
    }
    if (courseTitle === '') {
      console.log('Course Title is required');
      return;
    }

    console.log(courseCode, courseTitle);
  };

  return (
    <>
      <StyledContainer component="main" maxWidth="sm">
        <h2>Create Course</h2>
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
              type="email"
              value={courseCode}
            />
            <Box sx={{ marginTop: '10px' }} />
            <TextField
              label="Course Title"
              onChange={(e) => setCourseTitle(e.target.value)}
              required
              variant="outlined"
              fullWidth
              color="secondary"
              type="password"
              value={courseTitle}
            />
            <StyledButton variant="outlined" color="secondary" type="submit">
              Create Course
            </StyledButton>
          </StyledForm>
        </div>
      </StyledContainer>
    </>
  );
}

export default CreateCourse;
