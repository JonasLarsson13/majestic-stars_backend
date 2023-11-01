import bcrypt from "bcryptjs";
import connectDB from "../../services/db.js";
import { sendError, sendResponse } from "../../responses/index.js";
import User from "../../models/users.js";

async function registration(req) {
  try {
    await connectDB();
    const newUser = new User({
      email: req.email,
    });
    newUser.hash_password = bcrypt.hashSync(req.password, 10);

    const savedUser = await newUser.save();
    savedUser.hash_password = undefined;

    return sendResponse(200, { message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      //code 11000 betyder att det är redan registrerat i mongo
      return sendError(400, "Email is already registered");
    } else {
      return sendError(500, "Something went wrong", err);
    }
  }
}

export async function handler(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    const userReg = await registration(requestBody);
    return sendResponse(200, userReg);
  } catch (error) {
    return sendError(500, "Something went wrong");
  }
}
