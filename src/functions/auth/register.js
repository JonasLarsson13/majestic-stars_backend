import bcrypt from "bcryptjs";
import { localTest } from "../../services/connect.js";
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
    console.log("did it make it here?");
    const conn = await localTest();
  try {

    console.log("what about here?");
    console.log(req.password)
    const newUser = new User({
        email: req.email,
      });
    console.log(newUser);
    newUser.hash_password = bcrypt.hashSync(req.password, 10);

    const savedUser = await newUser.save();
    console.log(savedUser);
    savedUser.hash_password = undefined;

    return savedUser;
  } catch (err) {
    return sendError(500, "something went wrong", err);
  }
}

export async function handler(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    console.log(requestBody);
    const userReg = await registration(requestBody);
    console.log(userReg);
    return sendResponse(200, { message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return sendError(500, "something went wrong");
  }
}
