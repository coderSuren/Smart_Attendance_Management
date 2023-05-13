import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width:100%;
  overflow: hidden;
  // background: linear-gradient(
  //   217deg,
  //   rgba(16, 135, 203, 0.8),
  //   rgba(16, 135, 203, 0) 70.71%
  // ), linear-gradient(127deg, rgba(248, 176, 30, 0.8), rgba(248, 176, 30, 0) 70.71%),
  // linear-gradient(336deg, rgba(255, 94, 87, 0.8), rgba(255, 94, 87, 0) 70.71%);
  background: linear-gradient(
    217deg,
    rgba(112, 68, 176, 0.8),
    rgba(112, 68, 176, 0) 70.71%
  ), linear-gradient(127deg, rgba(238, 92, 69, 0.8), rgba(238, 92, 69, 0) 70.71%),
  linear-gradient(336deg, rgba(245, 166, 35, 0.8), rgba(245, 166, 35, 0) 70.71%);
  
  
  @media  (max-width:769px){
    
    width:100%;
}
}
background-size: 200% 200%;
animation: gradient 5s ease infinite;
height: 100vh;
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }

}
`;

const Ball = styled.div`
  position: absolute;
  border-radius: 50% 20%;
//   ${(props) => props.t} ${(props) => props.r} ${(props) => props.b} ${(props) => props.t}
  background: linear-gradient(to bottom right,${(props) => props.color},#ffffff);
  opacity:0.3;
  width: 200px;
  height: 200px;
  animation: ${(props) => props.animation} 10s ease-in-out infinite;
`;

const ball1Animation = keyframes`
  0% {
    transform: scale(1) translate(${Math.random() * 100}vw, ${Math.random() * 100}vh);
  }
  50% {
    transform: scale(1.3) translateY(-50vh);
  }
  100% {
    transform: scale(1) translate(${Math.random() * 100}vw, ${Math.random() * 100}vh);
  }
`;

const ball2Animation = keyframes`
0%   { transform: scale(1); }
  20%  { transform: scale(0.6, 1.2) translate(40vw, 30vh) rotate(160deg); }
  40%  { transform: scale(0.8, 1) translate(50vw, 30vh) rotate(160deg); }
  60%  { transform: scale(0.5, 0.4) translate(20vw, 50vh) rotate(160deg); }
  80%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
  100% { transform: scale(1); }
`;

const ball3Animation = keyframes`
0%   { transform: scale(1)   translate(10px, -30px); }
38%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
40%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
78%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
80%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
100% { transform: scale(1)   translate(10px, -30px); }
`;

const getRandomPosition = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  return { x, y };
};

const getRandomborder = () =>{
    const t = Math.random() * 100;
    const r = Math.random() * 100;
    const b = Math.random() * 100;
    const l = Math.random() * 100;
}

const Background = () => {
  const [ball1Position, setBall1Position] = useState(getRandomPosition());
  const [ball2Position, setBall2Position] = useState(getRandomPosition());
  const [ball3Position, setBall3Position] = useState(getRandomPosition());



  useEffect(() => {
    const intervalId = setInterval(() => {
      

    },);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Ball
        animation={ball1Animation}
        color="#ff7f11"
        // border-radius = {}
        style={{
          top: `${ball1Position.y}%`,
          left: `${ball1Position.x}%`,
        
        }}
      />
      <Ball
        animation={ball2Animation}
        color="#002845"
        style={{
          top: `${ball2Position.y}%`,
          left: `${ball2Position.x}%`,
       
        }}
      />
      <Ball
        animation={ball3Animation}
        color="#000045"
        style={{
          top: `${ball3Position.y}%`,
          left: `${ball3Position.x}%`,
        }}
      />
    </Container>
  );
};

export default Background;