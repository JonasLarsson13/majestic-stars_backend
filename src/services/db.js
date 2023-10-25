import { mongoose } from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL; // Get the MongoDB connection URL

    // Log the MongoDB connection URL
    console.log("MongoDB Connection URL:", url);

    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;