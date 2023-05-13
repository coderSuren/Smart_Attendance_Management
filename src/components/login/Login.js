// import React from 'react'

// function Login() {
//   return (
//     <div>
//         <div>
//             <form action=''>
//                 <div>
//                     <label></label>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { Snackbar, Alert } from "@mui/material";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({setIsLogin,setrole,setgeneratedCode}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      body: JSON.stringify({ query: loginQuery ,
      password:password}),
      // mode: 'cors',
    };
  
    // Define mysql localhost url
    const URL = 'http://localhost:5000/login';
    // http://localhost:5000/
    console.log("rhfg");
    console.log(loginRequestOptions)
    try {
      const resp = await fetch(URL, loginRequestOptions);
      const data = await resp.json();
      console.log(data);
      // if (data.success) {
      //   // Handle successful response
      // } else {
      //   showError();
      // }
      if (data[1].success){
        setIsLogin(true);
        console.log(data[0].role)
        setrole(data[0].role)
        setgeneratedCode(data[2].code)
        
        
      }
      else{
        showError();
        // setIsLogin(true);
      }
    } catch (e) {
      showError();
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            /> */}
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
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={loginUser}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2"> */}
                {/* {"Don't have an account? Sign Up"} */}
              {/* </Link> */}
            </Grid>
          </Grid>
          
        </form>

        <Snackbar
        open={isLoginFailed}
        autoHideDuration={6000}
        // onClose={hideError}
      >
        <Alert  severity="error" sx={{ width: "100%" }}>
          Login Error! Please Try again!
        </Alert>
      </Snackbar>
      </div>
    </Container>
    );
  } 
  export default Login;
