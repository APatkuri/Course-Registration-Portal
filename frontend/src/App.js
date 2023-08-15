import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import axios from "axios";
import { Login } from "./components/Login";
import { Courses } from "./components/Courses";
import { Instructor } from "./components/Instructor"
import { Registration } from "./components/Registration";
import { Navbar } from "./components/Navbar";
import { DeptRunning } from "./components/DeptRunning";
import { Courseinfo } from "./components/Courseinfo";
import { InstructorInfo } from "./components/InstructorInfo";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/home/registration" element={<Registration />}></Route>
        <Route exact path="/course/running" element={<Courses />}></Route>
        <Route exact path="/instructor" element={<Instructor />}></Route>
        <Route exact path="/course/running/:dept_name" element={<DeptRunning />}></Route>
        <Route exact path="/course/:course_id" element={<Courseinfo />}></Route>
        <Route exact path="/instructor" element={<Instructor />}></Route>
        <Route exact path="/instructor/:instructor_id" element={<InstructorInfo />}></Route>
      </Routes>
    </>
  );
}

export default App;
