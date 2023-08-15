import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import "./css/instructor.css"

const Table = (e)=>{
  const data = e.d //data is an array
  return(
    <table className="i1">
      <thead>
        <tr>
          <th>Index</th>
          <th>Instructor ID</th>
        </tr>
      </thead>
      <tbody>
          {data.map((a,index)=>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td><Link to={`/instructor/${a.id}`}>{a.id}</Link></td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}





export const Instructor = () => {
  // const [Stu, setStu] = useState([]);
  const [loginStatus, setloginStatus] = useState(false);
  const [Msg, setMsg] = useState("");
  const [UserID, setUserID] = useState("");
  const [data, setData] = useState([]);
  // setloginStatus(true);
  // setMsg("Already logged in");
  // setUserID(response.data.user.rows[0].id);
  // fetchStudInfo(response
  



  const fetchStudInfo = async (e)=>{
    Axios.get("http://localhost:3001/currinstructor").then((res)=>{
      setData(res.data);
    });
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/login-session")
      .then((response) => {
        if(response.data.loggedIn === true) {
          setloginStatus(true);
          setMsg("Already logged in");
          setUserID(response.data.user.rows[0].id);
          fetchStudInfo(response.data.user.rows[0].id);
        }
        else{
          setloginStatus(false);
          setMsg("User Not Logged In");
          setUserID("");
        }
      });
  }, []);

  return (
    <div className="instructor">
      {loginStatus && (<>
      <h1>Current Semester Instructors</h1>
        <h2>Logged into User {UserID}</h2>
        <Table d={data}/>

      </>)}
      {!loginStatus && (<>
        <h1>
          {Msg}
        </h1>
      </>)}
    </div>
  );
};


export default Instructor;
