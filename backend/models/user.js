import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  country: { type: String },
  favoriteSport: { type: String },
  passwordHash: { type: String, required: true },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "videos" }],
  verified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  logged_in: { type: Number, default: 0 },
  video_watched: { type: Number, default: 0 },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // returnedObject.favourites = returnedObject.favourites.map((fav)=>{return fav.toString()})
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("users", userSchema);
export default User;
