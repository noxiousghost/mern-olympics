import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  FILE_STORAGE,
} from "../utils/config.js";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();
const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(413).json({ error: err.message });
  } else {
    next();
  }
};

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

let storage = null;

if (FILE_STORAGE == "aws") {
  // Configure Multer to use S3 for storage with dynamic path
  storage = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    key: function (req, file, cb) {
      const fileType = req.fileType || "random"; // Fallback to "random" if no fileType is provided
      const newFileName = `${uuidv4()}-${file.originalname.trim()}`;
      const filePath = `${fileType}/${newFileName}`; // Construct the file path

      cb(null, filePath); // Pass the full path to S3 key
    },
  });
} else if (FILE_STORAGE == "disk") {
  // Set storage configuration
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fileType = req.fileType;
      let uploadPath;
      if (fileType) {
        uploadPath = `public/uploads/${fileType}`;
      } else {
        uploadPath = `public/uploads/random`;
      }
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      const newFileName = `${uuidv4()}-${file.originalname.trim()}`;
      cb(null, newFileName);
    },
  });
} else {
  console.log("error");
}

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

export { uploadImage, uploadVideo, s3, fileSizeLimitErrorHandler };
