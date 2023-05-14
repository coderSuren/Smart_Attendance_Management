import styled from 'styled-components';
import React, { useState } from 'react';
import Background from './Background';
import { SigninContainer } from './Loginstyles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Reset from './Reset';
// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  width: 200px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;
const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Component
const Forgot = () => {
  const handleFormSubmit = async(event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(email)
    const forgotQuery = `select * from authentication where email = '${email}'`;
    const forgotRequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: forgotQuery ,email:email,
        }),
        // mode: 'cors',
      };
    const URL = 'http://localhost:5000/forgot';
    try{
      const response = await fetch(URL,forgotRequestOptions);
      const data = await response.json();
      console.log(data);
      if(data[0].success){
        setgeneratedCode(data[1].code);
        setrole(data[2].role);
      }
      else{
        setemailerror(true);
      }
      
    }catch (e) {
        // showError();
        // setemailerror(true);
        console.log(e)
      }

  };
  const [email,setEmail] = useState();
  const [emailerror,setemailerror]=useState(false);
  const [codeerror,setcodeerror]=useState(false);
  const [generatedcode,setgeneratedCode] = useState(null);
  const [enteredcode,setEnteredcode] = useState();
  const [otpverify,setOtpverify] = useState(false);
  const [role,setrole] = useState();
//   const [email,setemail] = useState();
  
  const handleCode = ()=>{
    if(String(generatedcode) === enteredcode){
        // if (String(generatedcode) === code){
    //   setcodeerror(false);
      setOtpverify(true);

    //   setgeneratedCode(null);
    //   console.log("sfjk")
    }
    else{
        setcodeerror(true);
        console.log("fail",enteredcode,String(generatedcode));
    }
  }

  function handleDialogClose(){
    setemailerror(false);
    setcodeerror(false);
  }
  if (otpverify){
    return(<Reset role={role} email={email}/>)
    

    }
  if (generatedcode && !otpverify){

    return(
        <>
        <Background/>
        <SigninContainer>
        <Container>
          <Title>Enter OTP</Title>
          <form onSubmit={handleCode}>
            <InputField type="code" placeholder="Enter your otp" value={enteredcode} onChange={(e) => setEnteredcode(e.target.value)} required />
            <Button type="submit">Submit OTP</Button>
          </form>
        </Container>
        </SigninContainer>



        <Dialog open={codeerror} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid OTP. Please check and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
        </>

    )
  }

// when otp is verified reset password  
if (generatedcode && otpverify){
    <Reset/>

}

else{

  return (
    <>
    <Background/>
    <SigninContainer>
    <Container>
      <Title>Forgot Password</Title>
      <form onSubmit={handleFormSubmit}>
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit">Forgot Password</Button>
      </form>
    </Container>
    </SigninContainer>

    <Dialog open={emailerror} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Couldn't find your email. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      

    </>
  );
}
};

export default Forgot;
