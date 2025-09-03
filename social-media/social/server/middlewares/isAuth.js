import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        // when user makes a request to a protected route, we will check for the token in the cookie
        // if token is present, we will verify it by using the secret key. If token is valid, we will
        // allow the user to access the protected route. If token is not valid, we will return an error.
        // if token is not present, we will return an error.
        const token = req.cookies.token; // get token from cookie
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id; // add user id to request object
        next(); // proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}

export default isAuth;