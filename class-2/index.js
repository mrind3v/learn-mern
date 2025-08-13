const express = require("express");

const app = express();

let courses = [
  { id: 1, name: "Java" },
  { id: 2, name: "DBMS" },
  { id: 3, name: "ML" },
];

// middle to convert json data from req body to js object to be used in server side code
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// implementing route parameters

// to get a course by id
app.get("/courses/:id", (req, res) => {
  // id is part of req object
  console.log(req.params);

  // method-1
  res.send(courses[req.params.id - 1]);

  // method-2
  // let course = courses.find((course) => {
  //     course.id === parseInt(req.params.id);
  //   });
  //   res.send(course);
});

// to get all courses
app.get("/courses", (req, res) => {
  res.send(courses); // res.send() changes js object to json automatically
});

// create a course (POST)
app.post("/courses", (req, res) => {
    // HW: figure out what errors you may get when doing a post request

  //let newCourse = {id: 4, name: "NodeJS"} // but newCourse should actually be sent by client
  //courses.push(newCourse)
  let newCourse = { id: req.body.id, name: req.body.name };
  // we get 500 internal error because req.body is json but newCourse is js object
  // so we want every req to become js object using a middleware!
  courses.push(req.body);
  res.send(courses); // to see all courses
});

// update a course in courses (first we identify the resource before updating it) - PUT
app.put("/courses/:id", (req, res) => {
    // find the course
    let course = courses.find(course => course.id===parseInt(req.params.id));
    if (!course){
        //res.status(404).json({"message":"course not found"}) 
        res.status(404).send("Course not found!")
    }
    course.name=req.body.name // update step
    res.send(course)
});

app.listen(8001, () => {
  console.log("Server is running on PORT 8001");
});

// HW - find the difference between route and query params
