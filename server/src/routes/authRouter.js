import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controller/authController.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;