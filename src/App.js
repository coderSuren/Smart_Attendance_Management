import './App.css';
import React, { useState } from 'react';
// import 
import Student from './components/dashboard/Student'
import Login from './components/login/Login';
// import { Auth } from './components/login/Auth';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [role,setrole] = useState("");
  
    if(!isLogin){
      return (
        <Login setIsLogin={setIsLogin} setrole={setrole}/>
      )
    }
    else{
      if (role == "faculty"){
        return(
          <>
          <h1>Login successful for faculty</h1>
          </>
        )
      }
      if (role == "student"){
        return(
          <Student />
        )
      }
      if (role == "admin"){
        return(
          <>
          <h1>Login successful for admin</h1>
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
