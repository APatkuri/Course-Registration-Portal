import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import "./css/login.css"
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  // const [usernameReg, setUsernameReg] = useState('')
  // const [passwordReg, setPasswordReg] = useState('')

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setloginStatus] = useState(false);
  const  [ msg, setMsg] = useState("Login In");
  const [userId, setUserID] = useState("");


  const login1 = () => {
    Axios.post('http://localhost:3001/login', {
      username: username, 
      password: password,
    }).then((response) => {
      console.log("aditya",response);
      if(response.data.success) {
        setloginStatus(response.data.success);
        setUserID(response.data.data.rows[0].id);
        setMsg(response.data.message);
        refreshToHome();
      } else {
        setloginStatus(response.data.success);
        setMsg(response.data.message);
      }
      // console.log(response)
    }); 
  };



  const refreshOnSpot = () =>{
    window.location.reload(true);
  }
  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/home");
  }
  const logout = () => {
    Axios.get('http://localhost:3001/logout')
    .then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      refreshOnSpot();


    }); 
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        setMsg("Logged Into User ID")
        setUserID(response.data.user.rows[0].id)
      }
    });
  }, []);

  return (
    
    <div className='login'>
    <h1> {msg} {userId}</h1>
    <div className='login2'>
        {!loginStatus && (<>
        <div className='uname'>
          <label>Student ID</label>
            <input 
              type="test"
              placeholder="Enter Student ID"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              /></div>
          <div className='pswd'>
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              /></div>
            <button onClick={login1}>Login</button>
        </>)}
        {loginStatus && (<>
          <button onClick={logout}>Log Out</button>
        </>)}
    </div>  
  </div>  
  );
}
