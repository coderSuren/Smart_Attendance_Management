import './App.css';
import React, { useState } from 'react';
import Admin from './components/dashboard/Admin'

import Login from './components/login/Login';
// import { Auth } from './components/login/Auth';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [role,setrole] = useState("admin");
  
  
    // if(!isLogin){
    //   return (
    //     <Login setIsLogin={setIsLogin} setrole={setrole}/>
    //   )
    // }
    // else
    //setrole('admin');
    {
      if (role == "faculty"){
        return(
          <>
          <h1>Login successful for faculty</h1>
          </>
        )
      }
      else if (role == "student"){
        return(
          <>
          <h1>Login successful for student</h1>
          </>
        )
      }
      else if (role == "admin"){
        return(
          <>
          <Admin/>
          </>
        )
      }
     
    }
}
export default App;
