import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import router from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT;
const DB_CONNECT = process.env.DB_CONNECT;

mongoose
  .connect(String(DB_CONNECT))
  .then(() => {
    console.log("DB started");
  })
  .catch((err) => {
    console.log("DB crashed", err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
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
