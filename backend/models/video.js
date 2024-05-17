import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  postedAt: { type: Date, default: Date.now },
});

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video_url: { type: String, required: true },
  description: { type: String },
  views: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comments: [commentSchema],
  addedDate: {
    type: Date,
    default: Date.now,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

videoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Video = mongoose.model("videos", videoSchema);
export default Video;
