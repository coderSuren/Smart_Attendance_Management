import React from 'react';
import styled from 'styled-components';
import Image from './13167.jpg'
import { rgba } from 'polished';
export const SigninContainer = styled.div`
position: absolute;
display:flex;
top: 50%;
left: 50%;
width: 60%;
height: 60%;
// background-color: RGBA(100, 250, 245, 0.4);
background-color: rgba(200, 200, 200, 0.4);
background: linear-gradient(45deg, rgba(255, 204, 0, 0.2), rgba(255, 0, 204, 0.2), rgba(0, 204, 255, 0.2));
// background-image: url(${Image});
// backdrop-filter: brightness(250%);
// background: rgba(0, 0, 0, 0.3)
// background-image: linear-gradient(
//   to bottom,
//   ${rgba(0, 0, 0, 0.4)},
//   ${rgba(0, 0, 0, 0.1)}
// ), url(${Image});

background-size: cover;
// opacity:0.2;

backdrop-filter: blur(5px);
transform: translate(-50%, -50%);
// border: 3px solid black;
font-size: 3rem;
font-weight: bold;
align-items:center;
justify-content:center;
color: white;
border-radius: 25px;
@media  (max-width:769px){
  // display:None;
  width:100%;
  height: 100%;
  // transform: translate(0%, 0%);
`

export const H3=styled.h3`
    display:flex;
    font-size:50%;
    text-align:left;
    color:black;
    padding: 3%;
    font-weight: 1;
    
    padding-left: 0%;
    @media  (max-width:769px){
        font-size: 40%;
        
    }
    
`
