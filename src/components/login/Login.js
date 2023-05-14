import React, { useState } from 'react';
import { Snackbar, Alert } from "@mui/material";
import Background from './Background';
import Forgot from './Forgot';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Chip
} from '@mui/material';
import styled from 'styled-components';
import { SigninContainer, H3 } from './Loginstyles';

function printResult(res) {
  console.log(res);
}
const SigninForm = styled('form')({
  width: '100%',
  marginTop: '8px', // Replace with your desired spacing value
});

const SigninSubmitButton = styled(Button)({
  margin: '24px 0 16px', // Replace with your desired spacing value
});
const Login = ({ setIsLogin, setrole, setgeneratedCode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, isForgot] = useState(false);
  const [isLoginFailed, setisLoginFailed] = useState(null);

  const showError = () => {
    setisLoginFailed(true);
  };

  const loginUser = async () => {
    const loginQuery = `select role, password,email from Authentication where email = '${email}'`;
    const loginRequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: loginQuery, password: password }),
    };

    const URL = 'http://localhost:5000/login';

    try {
      const resp = await fetch(URL, loginRequestOptions);
      const data = await resp.json();
      printResult(data);
      
      if (data[1].success) {
        setIsLogin(true);
        setrole(data[0].role);
        setgeneratedCode(data[2].code);
      } else {
        showError();
      }
    } catch (e) {
      showError();
    }
  };

  const hideError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setisLoginFailed(null);
  };

  const handleForgot = () => {
    isForgot(true);
  };

  if (forgot) {
    return <Forgot />;
  } else {
    return (
      <>
        <Background />
        <SigninContainer>
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h3" style={{ color: 'white', paddingBottom: "2rem" }}>
                Smart Attendance
              </Typography>
              <Chip
                label="Sign In"
                style={{
                  fontSize: '1.5rem',
                  padding: '1.5rem',
                  color: '#000',
                }}
              />
              <SigninForm>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email address"
                  type="email"
                  id="email"
                  value={email}
                  style={{ color: "white" }}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <SigninSubmitButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={loginUser}
                >
                  Sign In
                </SigninSubmitButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" onClick={handleForgot}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2"> */}
                    {/* {"Don't have an account? Sign Up"} */}
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </SigninForm>
              <Snackbar
                open={isLoginFailed}
                autoHideDuration={6000}
                onClose={hideError}
              >
                <Alert severity="error" sx={{ width: "100%" }}>
                  Login Error! Please Try again!
                </Alert>
              </Snackbar>
            </div>
          </Container>
        </SigninContainer>
      </>
    );
  }
};

export default Login;

