// Q6. Note taking rest api - should be able to create a note, read/fetch all notes, update and delete a note
// Define Note schema and model
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = mongoose.model("Note", noteSchema);

// Routes
// TODO: Implement CRUD routes
app.post("/notes", async (req,res,next)=>{
  try {
    const { title, content } = req.body; 
    if (!title || !content){
      return res.status(400).json({message: "Bad request"}) 
    }
    const newNote = new Note({title, content});
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    next(error)
  }
})

app.get("/notes", async (req,res,next)=>{
  try {
    const data = await Note.find({})
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
})

app.put("/notes/:id", async (req,res,next)=>{
  try {
    const noteId = req.params.id;
    const { title, content } = req.body; 
    if (!title || !content){
      return res.status(400).json({message: "Invalid"})  
    }
    const updatedNote = await Note.findByIdAndUpdate(noteId,{title,content}, {new:true}); 
    if (!updatedNote){
      return res.status(404).json({message: "note not found"}) 
    }
    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
})

app.delete("/notes/:id", async (req,res,next)=>{
  try {
    const noteId = req.params.id; 
    if (!noteId){
      return res.status(400).json({message: "Invalid"})
    }
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote){
      res.status(404).json({message: "Not found"}) 
    }
    res.status(200).json({message: "Note deleted successfully"})
  } catch (error) {
    next(error) 
  }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});


//-----------------------------------------------------------------------------------------------------------------


// Q7. account management rest api - create account, fetch account, update and delete account
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

// Middleware for input validation
function validateInput(req, res, next) {
  // Implement validation logic
  const { username, password, email } = req.body 
  if (!username || !password || !email){
    return res.status(400).json({message: "Missing required field"}) 
  }
  if (typeof username!=="string" || username.length < 1) {
    return res.status(400).json({message: "Invalud username"}) 
  }
  if (typeof password!=="string" || password.length < 6) {
    return res.status(400).json({message: "Password must be at least 6 characters long"}) 
  }
  if (!validator.isEmail(email)){
    return res.status(400).json({message: "Invalid email format"})
  }
  next();
}

// Your code goes here.
app.post("/users", validateInput, async (req,res,next) => {
  try {
    const { username, password, email } = req.body 
    const newUser = new User({username, password, email})
    await newUser.save()  
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

app.put("/users/:id", validateInput, async (req,res,next)=>{
  try {
    const userId = req.params.id  
    const { username, password, email } = req.body  
    const updatedUser = await User.findByIdAndUpdate(userId, {username, password, email}, {new : true}) 
    if (!updatedUser){
      res.status(404).json({message: "User not found"}) 
    }
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

app.delete("/users/:id", async (req,res,next)=>{
  try {
    const userId = req.params.id  
    await User.findByIdAndDelete(userId)  
    res.status(200).json({message: "User deleted successfully"}) 
  } catch (error) {
    next(error)
  }
})

app.get("/users", async (req,res,next)=>{
  try {
    const users = await User.find() 
    res.json(users)
  } catch (error) {
    next(error) 
  }
})

app.get("/users/:id", async (req,res,next)=>{
  try {
    const userId = req.params.id  
    const specificUser = await User.findById(userId) 
    if (!specificUser){
      return res.status(404).json({message: "User not found"})   
    }
    res.json(specificUser)
  } catch (error) {
    next(error)
  }
})


//-----------------------------------------------------------------------------------------------------------------


// Q8. Request logger middleware - this middleware will log the timestamp and request method whenever a client
// hits any route - so the middleware should apply to all routes globally - app.use(middlewareFn)
function requestLoggerMiddleware(req, res, next) {
  const method = req.method
  const timeStamp = new Date().toISOString 
  console.log(`${method} request received, time: ${timeStamp}`)
  next()
}

app.use(requestLoggerMiddleware);


//----------------------------------------------------------------------------------------------------------------


// Q9. Hash user password using bcrypt and then push into users array
const bcrypt = require("bcrypt")
const users = []; 

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const saltRounds = 10;
    let hashedPass = await bcrypt.hash(password,saltRounds);
    const newUser = {username, password:hashedPass};
    users.push(newUser);
    res.status(201).json({message: "User registered successfully"})

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;


//----------------------------------------------------------------------------------------------------------------


// Q10. Use the express-rate-limit library to limit the number of requests coming to a route from a single IP
// address to a specific limit and throw 429 status code if that limit is cross
const rateLimit = require("express-rate-limit") 
const limiter = rateLimit({
  windowMs: 15*60,
  max: 100, // number of request winthin the above window
  message: "Too many requests. PLease try again after 15 minutes"
})
app.use(limiter)


