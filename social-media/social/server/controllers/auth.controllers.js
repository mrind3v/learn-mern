import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    // Validate user data
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Validate username
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // password strength
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // before storing the password, we will hash it using bcrypt
    // generate salt first - a random string that will be added to the password before hashing
    const salt = await bcrypt.genSalt(10); // 10 rounds of salt generation - how rounds to randomise our pass
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password with the salt

    // if all data is valid, create user - using try and catch block
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save(); // save user to database

    // generate token for the user after creating the user. Stamp the token with secret key
    // and user id. This token will be used to verify the user in future requests
    const token = genToken(newUser._id);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    // take username and password from req.body
    const { username, password } = req.body;

    // validate user data - if any field is missing
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists in database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // will use bcrypt to compare the password by hashing the entered password with salt.
    // bcrypt.compare() extracts the salt from original password in the database -> add it to entered
    //  password -> hash it using the same hashing function and compare!
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token  
    const token = await genToken(existingUser._id);

    // after generating the token, we will store it in the browser cookie.
    // Whenever you get access to the app, a token is given to you and that token is verified
    // on the server set cookie options
    res.cookie("token", token, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === "production", // only send cookie over https in production
      sameSite: true, // to prevent CSRF attacks. 
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    // if credentials are valid, send success response
    res.status(200).json({ message: "Sign in successful", user: existingUser });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};
