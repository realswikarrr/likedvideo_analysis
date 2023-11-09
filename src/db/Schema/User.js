import mongoose from "mongoose";

var userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    access_token: String,
    refresh_token: String,
    name: String,
  },
  { collection: "user" }
);

var User = mongoose.model("User", userSchema);

export default User;
