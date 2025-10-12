const express = require("express");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

// Q2. client req json - {"name":"Alice"}  To show - {"message","Hello Alice!"}
app.post("/greet", async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  res.status(200).json({ message: `Hello ${name}` });
});

// Q3. Query params - Add two numbers passed as query parameters
// query parameters are not visible in code, but only when client types it in url bar
app.get("/add", (req, res) => {
  const { a, b } = req.query; // also query params are by default parsed as strings
  res.json({ sum: Number(a) + Number(b) });
});

// Q4. Route params - display greeting message from name in route paramter
app.get("/welcome/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Welcome ${name}!` });
});

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

// Q7 Route organisation - product routes
// Always: make model first -> then write controllers and export em -> use controllers in routes
// --> use the exported router in app.use in index.js
app.use("/products", productRouter);

// Q8 Chained routes - Users CRUD
const Users = [
  { id: 1, name: "mrin" },
  { id: 2, name: "tanishq" },
];
app.use("/", userRouter);

// Q9 Use dotenv for environment variables
app.get("/env", (req, res) => {
  res.json({ port: process.env.PORT });
});

// Q10. Serve index.html (default) when user hits /
app.use(express.static(path.join(__dirname, "./public")));

// Q12. Simulating DB delay when user hits /posts for 2 sec and return [1,2,3] afterwards
app.get("/posts", (req, res) => {
  setTimeout(() => {
    res.json([1, 2, 3]);
  }, 2000);
});

// Q13. post /todos that takes title from req body and sends back incremented id and the title
id = 1;
app.post("/todos", (req, res) => {
  const { title } = req.body;
  res.json({ id: id++, title });
});

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

//Q15. Delete route for todo when user hits /todos/:id
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todosUpdated = Todos.filter((todo) => id !== todo.id);
  res.json(todosUpdated);
});

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

// Q19. mongoose model - comments
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/commentsDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  postId: {
    type: String,
  },
  authorId: {
    type: String,
  },
});
const Comment = mongoose.model("comment", commentSchema);

app.post("/comments", async (req, res) => {
  const { text, postId, authorId, authorName } = req.body;
  const newComment = new Comment({
    text,
    postId,
    authorId,
    authorName,
  });
  await newComment.save();
  res.status(200).json(newComment);
});

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
  // inside find -> if we do have author variable in query parameter author?, then return all documents that as the
  // value of the field "author" same as the value of the variable author in the query {author:author}, else
  // return all documents {}. {} is the filter object here -> an empty filter object means no filtering

  // NOTE: basically .find({a single object inside})
  const authorPost = await Post.find(author ? { author: author } : {});
  res.json(authorPost);
});

// Q21. aggregation - post count by author
app.get("/stats", async (req, res) => {
  const data = await Post.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);
  const betterData = Object.fromEntries(data.map((x) => [x._id, x.count]));
  res.json(betterData);
});

// Q22. File upload - multer
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("file"), (req, res) => {
  // or upload.array("filename",12)
  res.json({ filename: req.file.filename });
});

// Q23. JWT auth - token verification
const jwt = require("jsonwebtoken");
const SECRET = "12345";
app.post("/login", (req, res) => {
  if (req.body.username !== "admin") {
    return res.status(400).json({ error: "Unauthorized" });
  }
  const token = jwt.sign({ user: "admin" }, SECRET);
  res.json({ token });
});
app.get("/verify", (req,res)=>{
  jwt.verify(req.headers.authorization, SECRET, (err,payload)=>{
    if (err){
      return res.json({message: "Bad token"}) 
    }
    res.json(payload)
  })
})

// Q24. Global error handling middleware - this only runs if we pass an error in next() function in any route
// and that error is then handled by this middleware!
app.use((err,req,res,next)=>{
  res.status(500).json({error: "Something broke"})
})



app.listen(8080, () => {
  console.log("Server has started on port 8080");
});
