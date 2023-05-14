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

function CreateAdmin() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [adminID, setAdminID] = useState('');

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
        <h2>Create Admin</h2>
        <div>
          <StyledForm autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Admin ID"
              onChange={(e) => setAdminID(e.target.value)}
              required
              autoFocus
              fullWidth
              variant="outlined"
              color="secondary"
              type="email"
              value={adminID}
            />
            <Box sx={{ marginTop: '10px' }} />
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              fullWidth
              color="secondary"
              type="password"
              value={email}
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
            <StyledButton variant="outlined" color="secondary" type="submit">
              Create Admin Account
            </StyledButton>
          </StyledForm>
        </div>
      </StyledContainer>
    </>
  );
}

export default CreateAdmin;
