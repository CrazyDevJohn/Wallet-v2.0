import express from "express";
import {
  checkUser,
  profile,
  register,
  signIn,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/log-in", signIn);
router.get("/get-user", checkUser, profile);

export default router;
