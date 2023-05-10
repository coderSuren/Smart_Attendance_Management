import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function Login2fa({setIsLogin2,generatedcode}) {
  const classes = useStyles();
  const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform authentication or verification logic here
    console.log(generatedcode)
    console.log(`Entered code: ${code}`);
    console.log(typeof(code));
    console.log(generatedcode === code);
    if (String(generatedcode) === code){
        console.log("jslkdfj")
        setIsLogin2(true);
    }
    // setIsLogin2(true)
  };

  return (
    <Container maxWidth="xs">
        
      <form className={classes.container} onSubmit={handleSubmit}>
      <Typography variant="h5" component="h2" gutterBottom>
          Second Step Authentication
        </Typography>
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="code"
            label="code"
            type="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="current-password"
          />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Verify
        </Button>
      </form>
    </Container>
  );
}

// export default SecondStepAuthenticationPage;
