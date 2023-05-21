import './App.css';
import React, { useState } from 'react';
// import 
import Faculty from './components/dashboard/Faculty'
import Login2fa from './components/login/Login2fa';
import Student from './components/dashboard/Student/Student'
import Login from './components/login/Login';
import Admin from './components/dashboard/Admin/Admin'
// import { Auth } from './components/login/Auth';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [generatedcode,setgeneratedCode]=useState();
  // const [enteredcode,setenteredCode]=useState();
  const [role,setrole] = useState("");
  const [isLogin2, setIsLogin2] = useState(false);
  
    if(!isLogin){
      return (
        <Login setIsLogin={setIsLogin} setrole={setrole} setgeneratedCode={setgeneratedCode}/>
      )
    }
    if(!isLogin2){
      return (
        <Login2fa setIsLogin2={setIsLogin2} generatedcode={generatedcode} />
      )
    }
    else{
      if (role === "faculty"){
        return(
          <>
          {/* <h1>Login successful for faculty</h1> */}
          <Faculty/>
          </>
        )
      }
      if (role === "student"){
        return(
          <Student />
        )
      }
      if (role === "admin"){
        return(
          <>
          <Admin />
          </>
        )
      }
      // return(
      //   <div>
      //     if (role == "faculty"){
      //       <h1>Login successful for faculty</h1>
      //     }
      //     else if (role==="student"){
      //       <h1>Login successful for student</h1>
      //     }
      //     else if(role==="admin"){
      //       <h1>Login successful for admin</h1>
      //     }
      //     else{
      //       <h1>Login failed, invalid user role</h1>
      //     }
          
      //   </div>
      // )
    }
}
export default App;
