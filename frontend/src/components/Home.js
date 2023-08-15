import React, { useState, useEffect } from "react";
import Axios from 'axios'
import "./css/home.css"


const Table = (e)=>{
  const data = e.d //data is an array
  let allArray = [];
  let SemArray = [];
  for (let i1 in data) {
    let found = 0;
    for (let entry in SemArray) {
      if (SemArray[entry][0] === data[i1].semester && SemArray[entry][1] === data[i1].year) {
        found = 1;
        break;
      }
    }
    if (found) {
      continue;
    }
    let semArray = [];
    semArray.push(<tr>
      <th>Course</th>
      <th>Grade</th>
      <th>Section</th>
      <th>Semester</th>
      <th>Year</th>
    </tr>);
    for (let i2 in data) {
      if (data[i1].year === data[i2].year && data[i1].semester === data[i2].semester) {
        semArray.push(<tr>
          <td>{data[i2].course_id}</td>
          <td>{data[i2].grade}</td>
          <td>{data[i2].sec_id}</td>
          <td>{data[i2].semester}</td>
          <td>{data[i2].year}</td>
        </tr>);
      }
    }
    SemArray.push([data[i1].semester, data[i1].year]);
    allArray.push(<h3>{data[i1].semester}, {data[i1].year}</h3>);
    allArray.push(<table className="t1">
      <tbody>
        {semArray}
      </tbody>
    </table>);
  }
  return(
    <div>

      {allArray}
    </div>
  )
}



export const Home = () => {
  // const [Stu, setStu] = useState([]);
  const [loginStatus, setloginStatus] = useState(false);
  const [Msg, setMsg] = useState("");
  const [UserID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);


  const Table1 = (f) => {
    const data = f.d1; //data is an array
    return (
      <table className="t2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Total Credits</th>
            <th>Course</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Drop Course</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                  <td>{a.name}</td>
                  <td>{a.dept_name}</td>
                  <td>{a.tot_cred}</td>
                  <td>{a.course_id}</td>
                  <td>{a.sec_id}</td>
                  <td>{a.semester}</td>
                  <td>{a.year}</td>
                  <td><button onClick={() => {drop1(UserID, a.course_id, a.sec_id, a.semester, a.year);}}>DROP</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }

  const fetchStudInfo = async (e)=>{
    Axios.post("http://localhost:3001/students",{userID:e}).then((res)=>{
      setData(res.data);
    });
  }

  const fetchStudInfo1 = async (f)=>{
    Axios.post("http://localhost:3001/students1",{userID:f}).then((res)=>{
      setData1(res.data);
    });
  }

  const drop1 = async (id, course_id, sec_id, semester, year)=>{
    Axios.post("http://localhost:3001/drop",{id : id, course_id : course_id, sec_id : sec_id, sem : semester, year :year}).then((res)=>{
      setData1(res.data);
    });
    window.location.reload(true);
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session")
      .then((response) => {
        if(response.data.loggedIn === true) {
          setloginStatus(true);
          setMsg("Already logged in");
          setUserID(response.data.user.rows[0].id);
          fetchStudInfo(response.data.user.rows[0].id);
          fetchStudInfo1(response.data.user.rows[0].id);
        }
        else{
          setloginStatus(false);
          setMsg("User Not Logged In");
          setUserID("");
        }
      });
  }, []);

  return (
    <div className="home">
      {loginStatus &&(<>
      <h1>Welcome to Student Home Page</h1>
        <h2>Logged into User {UserID}</h2>
        <Table1 d1 ={data1}/>
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


export default Home;
