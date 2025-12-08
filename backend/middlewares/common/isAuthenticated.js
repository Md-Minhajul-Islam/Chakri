import jwt from "jsonwebtoken";
import { createError } from "./errorHandler.js";

export default async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw createError("User not authenticated.", 401);
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      throw createError("Invalid token", 401);
    }
    req.id = decode.userId;
    next();
  } catch (err) {
    next(err);
  }
}
