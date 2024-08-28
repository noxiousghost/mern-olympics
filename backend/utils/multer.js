import multer from "multer";
import { v4 } from "uuid";
import fs from "fs";

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/; // regex for checking file format
  const mimeType = allowedTypes.test(file.mimetype); // testing the file type with above regex
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
