import User from "../models/user.model.js";

// this controller runs when user is already validated by isAuth middleware
// and is trying to access a protected route
// we will get the user id from the request object (added by isAuth middleware)
// and then fetch the user details from the database and send it to the client
// we will not send the password to the client
export const getCurrentUser = async (req, res) => {
  const userId = req.userId; // this userId is sent to user model

  try {
    const user = await User.findById(userId).select("-password"); // exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
