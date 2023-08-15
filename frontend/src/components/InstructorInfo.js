import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import "./css/instructorinfo.css"
import { useParams } from "react-router-dom";

const Table1 = (f)=>{
  const data = f.d1 //data is an array
  return(
    <table className="ii1">
      <thead>
        <tr>
          {/* <th>Index</th> */}
          <th>Instructor_Name</th>
          <th>Instructor_Department</th>
        </tr>
      </thead>
      <tbody>
          {data.map((a,index)=>{
            return(
              <tr key={index}>
                {/* <td>{index+1}</td> */}
                <td>{a.name}</td>
                <td>{a.dept_name}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

const Table = (e)=>{
  const data = e.d //data is an array
  return(
    <table className="ii2">
      <thead>
        <tr>
          {/* <th>Index</th> */}
          <th></th>
          <th>Course_id</th>
          <th>Course_name</th>
        </tr>
      </thead>
      <tbody>
          {data.map((a,index)=>{
            return(
              <tr key={index}>
                {/* <td>{index+1}</td> */}
                <td><Link to={`/course/${a.course_id}`}>{a.course_id}</Link></td>
                <td>{a.title}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

const Table2 = (g)=>{
  const data = g.d2 //data is an array
  return(
    <table className="ii3">
      <thead>
        <tr>
          {/* <th>Index</th> */}
          <th></th>
          <th>Course_id</th>
          <th>Course_name</th>
        </tr>
      </thead>
      <tbody>
          {data.map((a,index)=>{
            return(
              <tr key={index}>
                {/* <td>{index+1}</td> */}
                <td><Link to={`/course/${a.course_id}`}>{a.course_id}</Link></td>
                <td>{a.title}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export const InstructorInfo = () => {
  // const [Stu, setStu] = useState([]);
  const [loginStatus, setloginStatus] = useState(false);
  const [Msg, setMsg] = useState("");
  const [UserID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const { instructor_id } = useParams();
  // setloginStatus(true);
  // setMsg("Already logged in");
  // setUserID(response.data.user.rows[0].id);
  // fetchStudInfo(response
  



  const fetchStudInfo = async (e)=>{
    Axios.get("http://localhost:3001/instructorinfo", {params: {instructor_id}}).then((res)=>{
      setData(res.data);
    });
  }

  const fetchStudInfo1 = async (e)=>{
    Axios.get("http://localhost:3001/instructorinfo1", {params: {instructor_id}}).then((res)=>{
      setData2(res.data);
    });
  }

  const fetchInstInfo = async (f)=>{
    Axios.get("http://localhost:3001/instructornamedept", {params: {instructor_id}}).then((res)=>{
      setData1(res.data);
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session")
      .then((response) => {
        if(response.data.loggedIn === true) {
          setloginStatus(true);
          setMsg("Already logged in");
          setUserID(response.data.user.rows[0].id);
          fetchInstInfo(response.data.user.rows[0].id);
          fetchStudInfo(response.data.user.rows[0].id);
          fetchStudInfo1(response.data.user.rows[0].id);
        }
        else{
          setloginStatus(false);
          setMsg("");
          setUserID("");
        }
      });
  }, []);

  return (
    <div className="instructorinfo">
      {loginStatus && (<>
        <h1>Instructor Details of {instructor_id}</h1>
        <Table1 d1={data1}/>
        <h2 className="cs">Current Semester</h2>
        <Table d={data}/>
        <h2 className="ps">Previous Semesters</h2>
        <Table2 d2={data2}/>

      </>)}
      {!loginStatus && (<>
        <h1>
          {Msg}
        </h1>
      </>)}
    </div>
  );
};


export default InstructorInfo;
