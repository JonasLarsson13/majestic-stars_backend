import bcrypt from "bcrypt";
import { localTest } from '../../services/connect.js'
import { model, mongoose, Schema } from 'mongoose'

var UserSchema = new Schema({
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    hash_password: {
      type: String
    },
  });
  
  UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
  mongoose.model('User', UserSchema);

const test = {
    name: 'Henry'
}
const User = mongoose.model('User');

async function testing(req, res) {
    localTest();
    var newUser = new User(test);
    newUser.hash_password = bcrypt.hashSync('2020', 10);
    try {
      const user = await newUser.save();
      user.hash_password = undefined;
      return res.json(user);
    } catch (err) {
      return 
    }
  }


testing()

export async function handler(event, context) {



}