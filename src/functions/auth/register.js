import bcrypt from "bcryptjs";
import connectDB from "../../services/db.js";
import { mongoose, Schema } from "mongoose";
import { sendError, sendResponse } from "../../responses/index.js";

var UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    hash_password: {
      type: String,
    },
  },
  { autoCreate: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model("User", UserSchema, "Users");

const User = mongoose.model("User");

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
    console.error(error);
    return sendError(500, "something went wrong");
  }
}

