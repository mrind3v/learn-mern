const express = require("express");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const path = require("path");

const app = express();
app.use(express.json());


// Q3. Query params - Add two numbers passed as query parameters
// query parameters are not visible in code, but only when client types it in url bar
app.get("/add", (req, res) => {
  const { a, b } = req.query; // also query params are by default parsed as strings
  res.json({ sum: Number(a) + Number(b) });
});


//-----------------------------------------------------------------------------------------------------------------


// Q4. Route params - display greeting message from name in route paramter
app.get("/welcome/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Welcome ${name}!` });
});


//-----------------------------------------------------------------------------------------------------------------


// Q5 - Basic middleware - time logger
function timeLogger(req, res, next) {
  // adding a new key to request object called time
  req.time = new Date().toISOString();
  next();
}

app.get("/time", timeLogger, (req, res) => {
  const timeNow = req.time;
  res.json({ time: timeNow });
});


//-----------------------------------------------------------------------------------------------------------------


// Q7 Route organisation - product routes
// Always: make model first -> then write controllers and export em -> use controllers in routes
// --> use the exported router in app.use in index.js
app.use("/products", productRouter);


//----------------------------------------------------------------------------------------------------------------------


// Q8 Chained routes - Users CRUD - see data folder for the required data -> then controllers folder and after that
// the routes folder
app.use("/", userRouter);


//-----------------------------------------------------------------------------------------------------------------


// Q9 Use dotenv for environment variables
require("dotenv").config();
app.get("/env", (req, res) => {
  res.json({ port: process.env.PORT });
});


//-------------------------------------------------------------------------------------------------------------------------


// Q12. Simulating DB delay when user hits /posts for 2 sec and return [1,2,3] afterwards
app.get("/posts", (req, res) => {
  setTimeout(() => {
    res.json([1, 2, 3]);
  }, 2000);
});



//-----------------------------------------------------------------------------------------------------------------


// Q14. send put req to /todos/:id to update the todo with the given id
const Todos = [
  { id: 1, title: "todo1" },
  { id: 2, title: "todo2" },
];
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const todo = Todos.find((todo) => todo.id === id);

  if (todo) {
    todo.title = title;
  }

  res.json(todo);
});


//--------------------------------------------------------------------------------------------------------------------


//Q15. Delete route for todo when user hits /todos/:id
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todosUpdated = Todos.filter((todo) => id !== todo.id);
  res.json(todosUpdated);
});


//---------------------------------------------------------------------------------------------------------------------


// Q16. Adv Middleware - check for certain header in req.header -> if present say access granted and if not, send
// 401 unauthorized message!
function auth(req, res, next) {
  const apiKey = Number(req.headers["x-api-key"]);
  if (apiKey !== 12345) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
app.get("/secure", auth, (req, res) => {
  res.json({ message: "Access granted..." });
});


//-----------------------------------------------------------------------------------------------------------------


// Q18. Chain middlewares - logger logs method (can use req.method )and then auth checks x-api-key
function logger(req, res, next) {
  console.log(req.method);
  next();
}

function auth(req, res, next) {
  const apiKey = Number(req.headers["x-api-key"]);
  if (apiKey !== 12345) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/admin", logger, auth, (req, res) => {
  // NOTICE that we are passing two middlewares one after the other
  res.json({ message: "Access granted" });
});


//---------------------------------------------------------------------------------------------------------------------


// Q20. Filter posts by author
const postSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  author: {
    type: String,
  },
});
const Post = mongoose.model("post", postSchema);

app.get("/posts?author=mrinmay", async (req, res) => {
  const { author } = req.query;
  // inside find -> if we do have author variable in query parameter author?, then return all documents with the
  // value of the field "author" same as the value of the variable author in the query {author:author}, else
  // return all documents {}. {} is the filter object here -> an empty filter object means no filtering

  // NOTE: basically .find({a single object inside})
  const authorPost = await Post.find(author ? { author: author } : {});
  res.json(authorPost);
});


//------------------------------------------------------------------------------------------------------------------


// Q21. aggregation - post count by author
app.get("/stats", async (req, res) => {
  const data = await Post.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);
  const betterData = Object.fromEntries(data.map((x) => [x._id, x.count]));
  res.json(betterData);
});


//-----------------------------------------------------------------------------------------------------------------


// Q22. File upload - multer
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("file"), (req, res) => {
  // or upload.array("filename",12)
  res.json({ filename: req.file.filename });
});


//------------------------------------------------------------------------------------------------------------------

// Q24. Global error handling middleware - this only runs if we pass an error in next() function in any route
// and that error is then handled by this middleware!
app.use((err,req,res,next)=>{
  res.status(500).json({error: "Something broke"})
})



app.listen(8080, () => {
  console.log("Server has started on port 8080");
});
