import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./css/registration.css";

export const Registration = () => {
  // const [Stu, setStu] = useState([]);
  const [loginStatus, setloginStatus] = useState(false);
  const [Msg, setMsg] = useState("");
  const [UserID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [selected, setselected] = useState(null);
  // setloginStatus(true);
  // setMsg("Already logged in");
  // setUserID(response.data.user.rows[0].id);
  // fetchStudInfo(response

  const Table = (e) => {
    const data = e.d; //data is an array
    return (
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Register</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.course_id}</td>
                <td>{a.title}</td>
                <td>
                  <select>
                    <option>{a.sec_id}</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => {register(UserID, a.course_id, a.sec_id, a.semester, a.year);}}>Register</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  const fetchStudInfo = async (e) => {
    Axios.get("http://localhost:3001/currcourses").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const register = async (id, course_id, sec_id, semester, year) => {
    Axios.post("http://localhost:3001/register", { id : id, course_id : course_id, sec_id : sec_id, sem : semester, year :year }).then(
      (res) => {
        console.log(res.data);
        // setData(res.data);
      }
    );
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

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    setselected(Array(item));
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    setselected(null);
    console.log("Cleared");
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.course_id}</span>
      </div>
    );
  };

  return (
    <div className="registration">
      <h1>Registration Page</h1>
      <div
        style={{
          width: 400,
        }}
      >
        <ReactSearchAutocomplete
          items={data}
          fuseOptions={{ keys: ["title", "course_id"] }}
          //     // necessary, otherwise the results will be blank
          resultStringKeyName="title"
          onSearch={handleOnSearch}
          // onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={handleOnClear}
          styling={{ zIndex: 4 }} // To display it on top of the search box below
          autoFocus
        />
      </div>
      {loginStatus && selected && (
        <>
          <Table d={selected} />
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

export default Registration;
