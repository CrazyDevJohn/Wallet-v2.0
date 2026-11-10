import express from "express";
import {
  createTransection,
  deleteTransection,
  getSummery,
  getTransections,
} from "../controllers/transactions.controller";

const router = express.Router();

router.get("/:userId", getTransections);
router.post("/create", createTransection);
router.delete("/:id", deleteTransection);
router.get("/summery/:userId", getSummery);

export default router;
