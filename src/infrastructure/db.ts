import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    await mongoose.connect(`${connectionString}`);
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed");
  }
};
