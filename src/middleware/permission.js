import jwt from "jsonwebtoken";
import connectDB from "../services/db.js";
import User from "../models/users.js";
import { sendError } from "../responses/index.js";

const checkPermission = {
  before: async (req) => {
    try {
      const token = req.event.headers["authorization"].split(" ")[1];
      if (!token) return sendError(401, "No token provided");

      await connectDB();
      const decode = jwt.verify(token, "UnsecureSecretJWTkey");
      const user = await User.findById(decode._id);
      if (!user) return sendError(401, "Invalid token");

      req.event.user = user;
    } catch (error) {
      return sendError(401, error.message);
    }
  },
};

export { checkPermission };
