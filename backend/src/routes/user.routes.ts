import express from "express";
import { profile, register, signIn } from "../controllers/user.controller.ts";
import { checkUser } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.get("/get-user", checkUser, profile);
router.post("/register", register);
router.post("/log-in", signIn);

export default router;
