import express from "express";
const router = express.Router();

import { create, login } from "../controllers/UserController.js";

router.post("/registration", create);
router.post("/login", login);

export default router;
