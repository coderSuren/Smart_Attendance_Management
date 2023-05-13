import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SigninContainer } from './Loginstyles';
import Background from './Background';
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
  const [codeerror,setcodeerror]=useState(false);

//   const handleCodeChange = (event) => {
//     setCode(event.target.value);
//   };

  function handleDialogClose(){
    setcodeerror(false)
  }
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
        setcodeerror(false)
    }else{
        setcodeerror(true)
    }
    // setIsLogin2(true)
  };

  return (
    <>
    <Background/>
    <SigninContainer>
      <Container style={{backgroundcolor:"white"}}>
    <Container maxWidth="xs" style={{backgroundcolor:"white"}}>
        
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
    <Dialog open={codeerror} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Code does not match. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
      </SigninContainer>
    </>
  );
}

// export default SecondStepAuthenticationPage;
