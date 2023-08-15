const bcrypt = require("bcrypt");

const Pool = require("pg").Pool;
const p = require("../config");

const pool = new Pool(p.pool);



const getDepartments = (request, response) => {
  pool.query("SELECT * FROM department", (error, results) => {
    if (error) {
      throw error;
    }
    // console.log(results.rows);
    response.status(200).json(results.rows);
  });
};

const getLogin = (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  pool.query(
    "SELECT * FROM user_password WHERE id = $1",
    [username],
    (error, results) => {
      if (error) {
        response.send({ error: error });
      }

      if (results.rows.length > 0) {
        bcrypt.compare(
          password,
          results.rows[0].hashed_password,
          (err, res) => {
            if (res) {
              request.session.user = results;
              // console.log(request.session.user)
              // console.log('1',request.session);
              response.send({
                success: true,
                message: "Successful login",
                data: results,
              });
            } else {
              response.send({
                success: false,
                message: "Wrong Username/Password Combo!!",
              });
            }
          }
        );
      } else {
        response.send({ success: false, message: "User Does Not Exist!" });
      }
    }
  );
};

const getLoginSession = (request, response) => {
  if (request.session.user) {
    // console.log('3', request.session.user);
    response.send({ loggedIn: true, user: request.session.user });
  } else {
    response.send({ loggedIn: false });
  }
};

const getLogout = (request, response) => {
  if (request.session.user) {
    response.clearCookie("iitbuser");
    response.send({ loggedIn: false });
  } else {
    response.send({ message: "No Cookie to Clear!" });
  }
};

const getCoursesbyDepartment = (request, response) => {
  const dname = request.params.deptname;

  pool.query(
    "SELECT * FROM course WHERE dept_name = $1",
    [dname],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCourses = (request, response) => {
  pool.query("SELECT * FROM course", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getStudent = (request, response) => {
  // console.log('2',request.session.user.rows[0].id);
  // console.log(request.session);
  const v = request.body.userID;
  pool.query(
    "SELECT * FROM student JOIN takes ON student.id = takes.id join reg_dates on (reg_dates.semester=takes.semester and reg_dates.year=takes.year) where student.id = $1 order by reg_dates.start_time desc",
    [v],
    // "SELECT * FROM student JOIN takes ON student.id = takes.id",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      // console.log(results.rows);
    }
  );
};

const getstudent1 = (request, response) => {
  // console.log('2',request.session.user.rows[0].id);
  // console.log(request.session);
  const v = request.body.userID;
  pool.query(
    "SELECT * FROM student JOIN takes ON student.id = takes.id join reg_dates on (reg_dates.semester=takes.semester and reg_dates.year=takes.year) where ( reg_dates.semester = (select semester from reg_dates where start_time = (select max(start_time) from reg_dates)) AND reg_dates.year = (select year from reg_dates where start_time = (select max(start_time) from reg_dates))) and student.id = $1",
    [v],
    // "SELECT * FROM student JOIN takes ON student.id = takes.id",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getInstructor = (request, response) => {
  pool.query(
    "SELECT * FROM instructor JOIN takes ON instructor.id = takes.id",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCoursesPrereq = (request, response) => {
  pool.query(
    "SELECT * FROM course LEFT JOIN prereq ON course.course_id = prereq.course_id",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCurrCourses = (request, response) => {
  pool.query(
    "SELECT * FROM section LEFT JOIN course ON section.course_id = course.course_id JOIN reg_dates ON (section.year = reg_dates.year AND section.semester = reg_dates.semester) AND start_time = (select max(start_time) from reg_dates)",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getDeptName = (request, response) => {
  pool.query(
    "SELECT distinct course.dept_name FROM section LEFT JOIN course ON section.course_id = course.course_id JOIN reg_dates ON (section.year = reg_dates.year AND section.semester = reg_dates.semester) AND start_time = (select max(start_time) from reg_dates)",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getDeptCourse = (request, response) => {
  // console.log(request.query);
  const dept_name = request.query.dept_name;
  pool.query(
    "SELECT section.course_id FROM section LEFT JOIN course ON section.course_id = course.course_id JOIN reg_dates ON (section.year = reg_dates.year AND section.semester = reg_dates.semester) AND start_time = (select max(start_time) from reg_dates) AND course.dept_name = $1",
    [dept_name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getcourseinfo = (request, response) => {
  // console.log(request.query);
  const course_id = request.query.course_id;
  pool.query(
    "select * from course left join prereq on course.course_id = prereq.course_id left join teaches on course.course_id = teaches.course_id WHERE course.course_id = $1",
    [course_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(results.rows);
      response.status(200).json(results.rows);
    }
  );
};

const getcurrinstructor = (request, response) => {
  // console.log(request.query);
  pool.query(
    "SELECT * FROM (teaches LEFT JOIN instructor ON teaches.id = instructor.id) WHERE ( teaches.semester = (select semester from reg_dates where start_time = (select max(start_time) from reg_dates)) AND teaches.year = (select year from reg_dates where start_time = (select max(start_time) from reg_dates)))",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getinstructorinfo = (request, response) => {
  // console.log(request.query);
  const instructor_id = request.query.instructor_id;
  pool.query(
    "SELECT * FROM teaches LEFT JOIN instructor ON teaches.id = instructor.id LEFT JOIN course ON teaches.course_id = course.course_id WHERE ( teaches.semester = (select semester from reg_dates where start_time = (select max(start_time) from reg_dates)) AND teaches.year = (select year from reg_dates where start_time = (select max(start_time) from reg_dates))) AND teaches.id = $1 ",
    [instructor_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getinstructorinfo1 = (request, response) => {
  // console.log(request.query);
  const instructor_id = request.query.instructor_id;
  pool.query(
    "SELECT * FROM teaches LEFT JOIN instructor ON teaches.id = instructor.id LEFT JOIN course ON teaches.course_id = course.course_id WHERE ( teaches.semester <> (select semester from reg_dates where start_time = (select max(start_time) from reg_dates)) AND teaches.year <> (select year from reg_dates where start_time = (select max(start_time) from reg_dates))) AND teaches.id = $1 ORDER BY year desc",
    [instructor_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getinstructornamedept = (request, response) => {
  // console.log(request.query);
  const instructor_id = request.query.instructor_id;
  pool.query(
    "SELECT * FROM instructor where id = $1",
    [instructor_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getregister = (request, response) => {
  // console.log(request.query);
  // const instructor_id = request.query.instructor_id;
  // console.log(request.body.selected[0]);
  const id = request.body.id;
  const course_id = request.body.course_id;
  const sec_id = request.body.sec_id;
  const sem = request.body.sem;
  const year = request.body.year;
  pool.query("INSERT INTO takes VALUES ($1, $2, $3, $4, $5)", [id, course_id, sec_id, sem , year], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getdrop = (request, response) => {
  // console.log(request.query);
  // const instructor_id = request.query.instructor_id;
  // console.log(request.body);
  const id = request.body.id;
  const course_id = request.body.course_id;
  const sec_id = request.body.sec_id;
  const sem = request.body.sem;
  const year = request.body.year;
  pool.query("DELETE FROM takes where id = $1 and course_id = $2 and sec_id = $3 and semester = $4 and year = $5", [id, course_id, sec_id, sem , year], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};



module.exports = {
  getDepartments,
  getCoursesbyDepartment,
  getCourses,
  getStudent,
  getstudent1,
  getLogin,
  getLogout,
  getLoginSession,
  getInstructor,
  getCoursesPrereq,
  getCurrCourses,
  getDeptName,
  getDeptCourse,
  getcourseinfo,
  getcurrinstructor,
  getinstructorinfo,
  getinstructorinfo1,
  getinstructornamedept,
  getregister,
  getdrop,
};
