import mongoose from "mongoose";

const videoDetailsChildSchema = new mongoose.Schema({
  videoTitle: String,
  channelTitle: String,
  videoTags: [{ type: String }],
  categoryId: String,
});

var videoDetailsSchema = new mongoose.Schema(
  {
    userEmail: String,
    data: [videoDetailsChildSchema],
  },
  { collection: "videoDetails" }
);

var videoDetails = mongoose.model("videoDetails", videoDetailsSchema);

export default videoDetails;
