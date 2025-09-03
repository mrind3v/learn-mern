import jwt from "jsonwebtoken";

const genToken = async () => {
  try {
    // generate a token when user signs in or signs up
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    // after 30 days, the token will expire and user will have to sign in again and will be given
    // a new token. after generating the token, we store it in the browser cookie. Whenever
    // you get access to the app, a token is given to you and that token is verified on the server
    return token;
  } catch (error) {
    throw new Error("Error generating token" + error.message);
  }
};

export default genToken;