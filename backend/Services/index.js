const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./queries");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET","POST","PUT"],
    credentials: true
  }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
  session({
    key: "iitbuser",
    secret:"1234",
    resave:false,
    saveUninitialized:false ,
    cookie: {
      expires: 60*60*24*1000,
    },
  })
);


app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// app.post("/register", db.getRegister);
app.post("/login", db.getLogin);
app.get("/logout", db.getLogout)
app.get("/login-session", db.getLoginSession);
app.get("/depts", db.getDepartments);
app.get("/courses", db.getCourses);
app.get("/courses1/:deptname", db.getCoursesbyDepartment);
app.post("/students", db.getStudent);
app.post("/students1", db.getstudent1)
app.get("/courseprereq", db.getCoursesPrereq);
app.get("/instructor", db.getInstructor);
app.get("/currcourses", db.getCurrCourses);
app.get("/currdepts", db.getDeptName);
app.get("/currdeptcourse", db.getDeptCourse);
app.get("/courseinfo", db.getcourseinfo);
app.get("/currinstructor", db.getcurrinstructor);
app.get("/instructorinfo",db.getinstructorinfo);
app.get("/instructorinfo1", db.getinstructorinfo1);
app.get("/instructornamedept", db.getinstructornamedept);
app.post("/register", db.getregister);
app.post("/drop", db.getdrop)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
