import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });


const uri = process.env.MONGO_URI;

const options = {}; 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, options);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exiting with a non-zero code indicates failure
  }
};

export default connectDB;
