import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload");
  },
  filename: (req, file, cb) => {
    if (!file) {
      return;
    }
    const fileName = `${Math.random()}${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
