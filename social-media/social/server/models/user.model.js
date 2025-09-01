import mongoose from "mongoose";
import {
  emit,
  estimatedDocumentCount,
} from "../../../../class-4-MVC/models/product.model";

// first create user schema (keeping social media in mind) and then the model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // no two users can have the same email
      trim: true,
      lowercase: true, // convert email to lowercase before saving
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
        type: String,
        default: "" // default profile pic URL 
    },
    bio: {
        type: String,
        default: "",
    },
    followers: [], // array of user ids who follow this user
    following: [], // array of user ids whom this user follows  
    posts: [], // array of post ids created by this user
    reels: [], // array of reel ids created by this user
    story: [], // array of story ids created by this user
  },
  { timestamps: true }
); // timestamps will automatically create "createdAt" and "updatedAt" fields

// now create the model
const User = mongoose.model("User", userSchema);

export default User;
// now we can use this model in controllers to perform CRUD operations
