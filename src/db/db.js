import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("database connected sucessfully");
  } catch (err) {
    console.log("error connecting to database", err);
  }
}

export default connectDB;
