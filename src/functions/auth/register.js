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
  }, { autoCreate: true });
  
  UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
  mongoose.model('User', UserSchema, 'Users');

const User = mongoose.model('User');

async function registration(req, res) {
    try {
        const conn = await localTest();
        const newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        
        const savedUser = await newUser.save();
        savedUser.hash_password = undefined;
        
        return res.json(savedUser);
    } catch (err) {
        return res.status(400).send({
            message: err.message
        });
    }
}

export async function handler(event, context) {
    try {
        
      // Handle the actual POST request
      console.log(event)
      const requestBody = JSON.parse(event);
      const userReg = await registration(event);
      console.log(userReg);
      return {
        statusCode: 200,
        headers: commonHeaders,
        body: JSON.stringify({ chatresult }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        headers: commonHeaders,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  }