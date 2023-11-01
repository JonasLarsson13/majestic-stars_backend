import connectDB from "../../services/db.js";
import { sendError, sendResponse } from "../../responses/index.js";
import User from "../../models/users.js";
import Jwt from "jsonwebtoken";

async function login(req, res) {
  try {
    await connectDB();

    const user = await User.findOne({ email: req.email });

    if (!user || !user.comparePassword(req.password)) {
      return sendResponse(401, { message: "Invalid username or password." });
    }

    const token = Jwt.sign(
      { email: user.email, _id: user._id },
      "UnsecureSecretJWTkey"
    );
    return token;
  } catch (err) {
    return sendError(500, "Something went wrong.");
  }
}

export async function handler(event, context) {
  try {
    const requestBody = JSON.parse(event.body);

    const userToken = await login(requestBody);

    return sendResponse(200, userToken);
  } catch (error) {
    return sendError(500, "Something went wrong.");
  }
}
