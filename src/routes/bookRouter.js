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
  createTwoAndMore,
  incrBook,
  getViewsBook,
} from "../controllers/BookController.js";

import { upload } from "../middleware/bookMulter.js";

router.post("/api/user/login", async (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

router.get("/", getAll);

router.post("/search", search);

router.post("/", upload.single("fileBook"), create);

router.put("/:id", upload.single("fileBook"), update);

router.get("/:id", getOne);

router.delete("/:id", remove);

router.get("/:id/download", download);

router.post("/createBooks", upload.single("fileBook"), createTwoAndMore);

router.post("/counter/:id/incr", incrBook);

router.get("/counter/:id", getViewsBook);

export default router;
