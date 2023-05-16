import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import Background from './Background';
import { SigninContainer } from './Loginstyles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
  width: 300px; /* Adjust the width as needed */
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const Reset = ({role,email}) => {
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [notmatch,setnotmatch] = useState();
  const [resetSuccess,setresetSuccess] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== reenterPassword) {
    //   setErrorMessage('Passwords do not match');
      setnotmatch(true)
      return;
    }
    else{
      console.log(role);
      console.log(email)
      const resetQuery1 =`update authentication set password = '${password}' where email = '${email}';`;
      const resetQuery2 = `update ${role} set password = '${password}' where email = '${email}';`;
      // const forgotQuery = `select * from authentication where email = '${email}'`;
      // console.log(resetQuery)
      const resetRequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query1: resetQuery1 ,query2:resetQuery2,email:email,
        }),
      };
      const URL = 'http://localhost:5000/reset';
      // const data = null
      try{
        const response = await fetch(URL,resetRequestOptions);
        const data = await response.json();
        // console.log("hello");
        console.log(data.result.affectedRows,data.result1.affectedRows);
        if(data.result.affectedRows && data.result1.affectedRows){
          console.log("success")
          setresetSuccess(true);
        }
        else{
          console.log("failed")
        }
      }catch(e){
        console.log(e);

      }

      
    }

    

    // Password reset logic here
    // ...

    // Clear form fields
    setPassword('');
    setReenterPassword('');
    setErrorMessage('');
  };

  const handleDialogClose = ()=>{
    setnotmatch(false);
  }
  function handleresetDialogClose(){
    setresetSuccess(false);
    window.location.href = '/';
  }
  return (
    <>
      <Background />
      <SigninContainer>
        <FormContainer>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#333' }}>
            Password Reset
          </h2>
          <StyledTextField
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledTextField
            type="password"
            label="Re-enter New Password"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            required
          />
          {errorMessage && <div>{errorMessage}</div>}
          <StyledButton type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Reset Password
          </StyledButton>
        </FormContainer>
      </SigninContainer>
      
      <Dialog open={notmatch} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Password not matching. Please try again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetSuccess} onClose={handleresetDialogClose}>
        <DialogTitle>Reset successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Password changed successful
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleresetDialogClose} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>



    </>
  );
};

export default Reset;
