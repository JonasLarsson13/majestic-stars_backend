// const mongoose = require('mongoose');

// let conn = null;

// const uri = process.env.MONGO_URL;

// exports.connect = async function() {
//   if (conn == null) {
//     conn = mongoose.createConnection(uri, {
//       serverSelectionTimeoutMS: 5000
//     });
//     await conn.asPromise();
//   }

//   return conn;
// };

import mongoose from 'mongoose';

let conn = null;

const uri = "mongodb+srv://heneli627:<password>!@majesticstars.c0ppytg.mongodb.net/?retryWrites=true&w=majority";

async function localTest() {
  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    });
    await conn.asPromise();
  }

  return conn;
};

export { localTest }