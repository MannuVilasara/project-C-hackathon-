import express from "express";
import {
  addServer,
  getUserServers,
  deleteServer,
  generateOtp,
  verifyServerOtp,
  checkVerificationSession,
} from "../controller/server.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/add/server", userAuth, addServer);
router.get("/my/servers", userAuth, getUserServers);
router.delete("/delete/server/:id", userAuth, deleteServer);
router.post("/generate/otp/:id", userAuth, generateOtp);
router.post("/verify/otp", verifyServerOtp);
router.get("/check/verification/:ip", checkVerificationSession);

export default router;
