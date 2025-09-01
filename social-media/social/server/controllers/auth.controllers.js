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
    const newUser = new User({ name, username, email, password : hashedPassword });
    await newUser.save(); // save user to database
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
