import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./css/courseinfo.css";

const Table = (e) => {
  const data = e.d; //data is an array
  return (
    <table className="ci1">
      <thead>
        <tr>
          <th>Index</th>
          <th>Course ID</th>
          <th>Course Name</th>
          <th>Credits</th>
          <th>Prerequisites</th>
          <th>Current Instructor</th>
        </tr>
      </thead>
      <tbody>
        {data.map((a, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{e.c}</td>
              <td>{a.title}</td>
              <td>{a.credits}</td>
              <td>
                {/* <Link to={`/course/${a.prereq_id}`}>{a.prereq_id}</Link> */}
                <a href={`/course/${a.prereq_id}`}>{a.prereq_id}</a>
              </td>
              <td>
                <Link to={`/instructor/${a.id}`}>{a.id}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const Courseinfo = () => {
  // const [Stu, setStu] = useState([]);
  const [loginStatus, setloginStatus] = useState(false);
  const [Msg, setMsg] = useState("");
  const [UserID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const { course_id } = useParams();
  // setloginStatus(true);
  // setMsg("Already logged in");
  // setUserID(response.data.user.rows[0].id);
  // fetchStudInfo(response

  const fetchStudInfo = async (e) => {
    Axios.get("http://localhost:3001/courseinfo", {
      params: { course_id },
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
      if (response.data.loggedIn === true) {
        setloginStatus(true);
        setMsg("Already logged in");
        setUserID(response.data.user.rows[0].id);
        fetchStudInfo(response.data.user.rows[0].id);
      } else {
        setloginStatus(false);
        setMsg("");
        setUserID("");
      }
    });
  }, []);

  return (
    <div className="courseinfo">
      {loginStatus && (
        <>
          <h1>Course Information of {course_id}</h1>
          <Table d={data} c={course_id} />
        </>
      )}
      {!loginStatus && (
        <>
          <h1>{Msg}</h1>
        </>
      )}
    </div>
  );
};

export default Courseinfo;
