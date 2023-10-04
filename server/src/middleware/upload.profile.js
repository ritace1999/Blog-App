import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const sanitizedFilename = originalname.replace(/\s+/g); // Replace spaces with underscores
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

const uploadPic = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1000000, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true); // Accept the file
  },
});

export { uploadPic };
