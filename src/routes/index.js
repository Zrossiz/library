import express from "express";
const router = express.Router();

import {
  create,
  getAll,
  getOne,
  remove,
  update,
  download,
  search,
} from "../controllers/BookController.js";

import { upload } from "../middleware/bookMulter.js";

router.post("/api/user/login", async (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

router.get("/books", getAll);

router.post("/books/search", search);

router.post("/books", upload.single("fileBook"), create);

router.put("/books/:id", upload.single("fileBook"), update);

router.get("/books/:id", getOne);

router.delete("/books/:id", remove);

router.get("/books/:id/download", download);

export default router;