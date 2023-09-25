import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/BookController.js";

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
  destination: (_, __, cb) => {
    cb(null, "upload");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/upload", express.static("upload"));

app.post("/api/user/login", async (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", getAll);

app.get("/api/books/:id", getOne);

app.post("/api/books", create);

app.put("/api/books/:id", update);

app.delete("/api/books/:id", remove);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    console.log(`Server crashed by error`);
  }

  console.log(`Server started on port: ${PORT}`);
});
