import mongoose from "mongoose";

var videoDetailsSchema = new mongoose.Schema(
  {
    videoTitle: String,
    channelTitle: String,
    videoTags: String,
    categoryId: String,
  },
  { collection: "videoDetails" }
);

var videoDetails = mongoose.model("videoDetails", videoDetailsSchema);

export default videoDetails;
