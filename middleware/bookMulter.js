import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    if (!file) {
      return;
    }
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
