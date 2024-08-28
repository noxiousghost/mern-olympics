import multer from "multer";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = req.fileType;
    let path;
    if (fileType) {
      path = `public/uploads/${fileType}`;
    } else {
      path = `public/uploads/random`;
    }
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename(req, file, cb) {
    // ${v4()}-
    const newFileName = `${file.originalname.trim()}`;
    cb(null, newFileName);
  },
});
// Configure Multer
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit for images
  fileFilter: fileFilter,
}).single("image");

const uploadVideo = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit for videos
  fileFilter: fileFilter,
}).single("video");

export { uploadImage, uploadVideo };
