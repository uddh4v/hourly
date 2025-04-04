// middlewares/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directory
const uploadPath = path.resolve("src/uploads");

// Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Multer middleware (single file)
const upload = multer({ storage });

export default upload;
