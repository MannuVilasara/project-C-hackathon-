import express from "express";
import {
  signup,
  login,
  logout,
  sendOtp,
  verifyOtp,
  sendMessage,
  githubAuth,
  githubCallback,
  getGitHubStatus,
  disconnectGithub,
} from "../controller/user.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/send-message", sendMessage);

// GitHub OAuth routes
router.get("/github/auth", userAuth, githubAuth);
router.get("/github/callback", githubCallback);
router.get("/github/status", userAuth, getGitHubStatus);
router.post("/github/disconnect", userAuth, disconnectGithub);

export default router;
