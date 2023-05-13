import styled from 'styled-components';
import React, { useState } from 'react';
import Background from './Background';
import { SigninContainer } from './Loginstyles';
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

// Component
const Forgot = () => {
  const handleFormSubmit = async(event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(email)

  };
  const [email,setEmail] = useState()

  return (
    <>
    <Background/>
    <SigninContainer>
    <Container>
      <Title>Forgot Password</Title>
      <form onSubmit={handleFormSubmit}>
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit">Reset Password</Button>
      </form>
    </Container>
    </SigninContainer>
    </>
  );
};

export default Forgot;
