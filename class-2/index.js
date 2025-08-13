const express = require("express");

const app = express();

let courses = [
  { id: 1, name: "Java" },
  { id: 2, name: "DBMS" },
  { id: 3, name: "ML" },
];

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
  //res.send(courses[req.params.id-1])

  // method-2
  let course = courses.find((course) => {
    course.id === parseInt(req.params.id);
  });
  res.send(course);
});

// to get all courses
app.get("/courses", (req, res) => {
  res.send(courses); // res.send() changes js object to json automatically
});

app.listen(8001, () => {
  console.log("Server is running on PORT 8001");
});
