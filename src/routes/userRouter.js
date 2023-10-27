import express from "express";
const router = express.Router();

import {
  switchFavorite,
  create,
  login,
} from "../controllers/UserController.js";

router.post("/registration", create);
router.post("/login", login);
router.put("/favorite", switchFavorite);
router.get("/favorite");

export default router;
