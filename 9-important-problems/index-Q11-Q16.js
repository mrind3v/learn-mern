// Q11 - validate age before hitting a route - important concept of using Number() function in a 
// undefined quantity
function validateAge(req, res, next) {
  const age = Number(req.query.age)
  // if age doesn't exist -> meaning, its undefined -> doing Number(age) would give NaN
  // -> not a number  
  if (isNaN(age) || age<18 || age>65){
    return res.status(400).json({error: "Invalid age. Age must be a number between 18 and 65."})
  }
  next()
}


//--------------------------------------------------------------------------------------------------------------


// Q12. Make a counter feature in your express js folder that tracks the number of times a client hits the /visit
// endpoint. Get the visitCounter variable from cookie inside req if it exists, otherwise initialise it
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.get("/visit", (req, res) => {
    let visitCount = req.cookies.visitCount;
    if (visitCount) {
      visitCount = Number(visitCount) + 1;
    } else {
      visitCount = 1;
    }
    res.cookie("visitCount", visitCount, { httpOnly: true });
    res.send(`This is your visit number ${visitCount}`);
});

module.exports = app;


//---------------------------------------------------------------------------------------------------------------


// Q13. Implement JWT based authentication in your express nodejs app. When users successfully logs in, it
// recevies a JWT token which it later uses to access protected routes
const jwt = require("jsonwebtoken");
app.use(express.json());

SECRET = "12345";
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("required");
    }
    if (username !== "admin" || password !== "password") {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ username: username }, SECRET);
    return res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/secret", (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken){
      return res.status(401).send("required")
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
      return res.status(401).send("required");
    }
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.status(401).send(err.message);
      }
      res.status(200).send("Welcome to the secret area");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/*
This is how req.headers look like
{
  "host": "localhost:3000",
  "connection": "keep-alive",
  "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"macOS\"",
  "upgrade-insecure-requests": "1",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "sec-fetch-site": "none",
  "sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-US,en;q=0.9",
  "cookie": "some_cookie=some_value",
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // here is authorization - stuff of interest
  "x-api-key": "12345" // again stuff of interest here!
}


*/


//-----------------------------------------------------------------------------------------------------------------


// Q14. Write a pre-save hook for a mongoose model with duration field which cannot be zero or negative
// --> just create a new error object and pass it to next function. What will happen is that, if a client
// sends a POST request to create a doc which has duration<=0 and tries to save it, mongoose will throw an error
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  language: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  poster: { type: String, required: true },
});

// Your code goes here.
// schema.pre fns intercept a schema function
movieSchema.pre("save", function (next) {
  if (duration<=0){
    const err = new Error("Duration cannot be 0 or negative") 
    next(err);
  }
  else {
    next()
  }
});


//----------------------------------------------------------------------------------------------------------------


// Q15 write a post save hook for a mongoose model to log a specific message to console each time we do 
// await Model.save() --> the log message would be "movie title is ${movie_title}". Assume the same schema
// as the previous question

movieSchema.post("save", function(movie){
    console.log(`Movie title: ${movie.title}`)
})


//-----------------------------------------------------------------------------------------------------------------



// Q16. the express js app should serve html, css and images to  serve files fro a specific folder called
// public in root directory. Also send index.html when client hits the endpoint "/"
app.use(express.static(path.join(__dirname, "./public"))); // public is within root folder only!

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
});




