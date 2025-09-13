// middlewares/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not provided", error: true, success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Access token expired", error: true, success: false });
    }
    return res
      .status(401)
      .json({ message: "Invalid token", error: true, success: false });
  }
};

export default auth;
