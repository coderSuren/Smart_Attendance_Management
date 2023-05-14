import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { SigninContainer } from './Loginstyles';
import Background from './Background';
import styled from 'styled-components';
const FormContainer = styled('div')({
  marginTop: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledTextField = styled(TextField)({
  marginBottom: '2rem',
});

const StyledButton = styled(Button)({
  marginTop: '2rem',
});


export default function Login2fa({setIsLogin2,generatedcode}) {
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
      <Background />
      <SigninContainer>
        <Container>
          <FormContainer>
            <Typography variant="h5" component="h2" gutterBottom>
              Second Step Authentication
            </Typography>
            <form onSubmit={handleSubmit}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="code"
                label="Code"
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoComplete="off"
              />
              <StyledButton type="submit" variant="contained" color="primary">
                Verify
              </StyledButton>
            </form>
          </FormContainer>
          <Dialog open={codeerror} onClose={handleDialogClose} minWidth="300px">
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