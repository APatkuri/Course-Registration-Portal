import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useParams } from "react-router-dom";
import "./css/deptrunning.css";


const Table = (e)=>{
  const data = e.d //data is an array
  return(
    <table className="dr1">
      <thead>
        <tr>
          <th>Index</th>
          <th>Courses</th>
        </tr>
      </thead>
      <tbody>
          {data.map((a,index)=>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td><Link to={`/course/${a.course_id}`}>{a.course_id}</Link></td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}





export const DeptRunning = () => {
  // const [Stu, setStu] = useState([]);
  const [loginStatus, setloginStatus] = useState(false);
  const [Msg, setMsg] = useState("");
  const [UserID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const { dept_name } = useParams();
  // setloginStatus(true);
  // setMsg("Already logged in");
  // setUserID(response.data.user.rows[0].id);
  // fetchStudInfo(response
  



  const fetchStudInfo = async (e)=>{
    Axios.get("http://localhost:3001/currdeptcourse", {params: {dept_name}}).then((res)=>{
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
          setMsg("");
          setUserID("");
        }
      });
  }, []);

  return (
    <div className="deptrunning">
      {loginStatus && (<>
        <h1>Current Running Courses Under {dept_name}</h1>
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


export default DeptRunning;
