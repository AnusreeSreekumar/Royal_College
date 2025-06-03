import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {

    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    req.loginId = userToken.userId;
    req.loginRole = userToken.userRole;
    next();

  } catch (error) {

    console.error("Error verifying token: ", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

