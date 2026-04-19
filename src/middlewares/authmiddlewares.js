import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
        where:{id:decoded.id}
    })
    if(!user){
        return res.status(401).json({error: "User Not exist"});
    }

    req.user = user;
    next();
  } catch (err) {
        if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expired. Please login again",
        });
        }
        return res.status(401).json({
        success: false,
        message: "Invalid token",
        });
  }
};
