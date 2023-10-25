import express from "express";
import bookRouter from "./bookRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();

router.use("/books", bookRouter);
router.use("/user", userRouter);

export default router;
