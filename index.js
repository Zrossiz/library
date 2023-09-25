import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

import router from "./routes/index.js";
import logger from "./middleware/logger.js";
import error404 from "./middleware/404.js";

dotenv.config();
const PORT = process.env.PORT;
const DB_CONNECT = process.env.DB_CONNECT;

mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log("DB started");
  })
  .catch((err) => {
    console.log("DB crashed", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/upload", express.static("upload"));

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    console.log(`Server crashed by error`);
  }

  console.log(`Server started on port: ${PORT}`);
});
