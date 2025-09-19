import Server from "../models/server.model.js";
import { getOtp } from "../utils/otpGenerator.js";
import ServerOTP from "../models/serverOtp.model.js";
import { getclientIp } from "../utils/getClientIp.js";

export const addServer = async (req, res) => {
  try {
    const { name, serverIP } = req.body;
    const userId = req.user;

    if (!name || !serverIP) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingServer = await Server.findOne({ serverIP });
    if (existingServer) {
      return res
        .status(400)
        .json({ message: "Server with this IP already exists" });
    }

    const newServer = new Server({
      name,
      serverIP,
      user: userId,
    });
    await newServer.save();
    res
      .status(201)
      .json({ message: "Server added successfully", server: newServer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserServers = async (req, res) => {
  try {
    const userId = req.user;
    const servers = await Server.find({ user: userId });
    res.status(200).json({ servers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteServer = async (req, res) => {
  try {
    const userId = req.user;
    const serverId = req.params.id;

    const server = await Server.findOne({ _id: serverId, user: userId });
    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }
    await Server.deleteOne({ _id: serverId });
    res.status(200).json({ message: "Server deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const generateOtp = async (req, res) => {
  try {
    const userId = req.user;
    const serverId = req.params.id;

    const server = await Server.findOne({ _id: serverId, user: userId });
    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }
    if (server.isVerified) {
      return res.status(400).json({ message: "Server is already verified" });
    }

    // generate a 6 digit otp that will expire in 10 minutes
    const otp = getOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const serverOtp = new ServerOTP({
      otp,
      server: serverId,
      user: userId,
      expiresAt,
    });
    await serverOtp.save();

    res.status(200).json({ message: "OTP generated successfully", otp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkVerificationSession = async (req, res) => {
  try {
    const serverIP = req.params.ip;

    const server = await Server.findOne({ serverIP });
    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    // Check if there's an active OTP session for this server
    const activeOtp = await ServerOTP.findOne({
      server: server._id,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (activeOtp) {
      return res.status(200).json({
        hasActiveSession: true,
        message: "Verification session is active",
      });
    } else {
      return res.status(200).json({
        hasActiveSession: false,
        message: "No active verification session",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyServerOtp = async (req, res) => {
  try {
    // const ip = getclientIp(req);
    const ip = "10.214.22.26";
    const { otp } = req.body;
    console.log("Client IP:", ip);
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }
    console.log("Received OTP:", otp);

    const server = await Server.findOne({ serverIP: ip });
    if (!server) {
      return res.status(404).json({
        message:
          "Server not found or IP address doesn't match any registered server",
      });
    }
    if (server.isVerified) {
      return res.status(400).json({ message: "Server is already verified" });
    }

    // Check if there's an active OTP session for this server
    const serverOtp = await ServerOTP.findOne({
      server: server._id,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!serverOtp) {
      return res.status(404).json({
        message:
          "No active verification session found. Please start verification from the website dashboard.",
      });
    }

    if (serverOtp.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP. Please check the OTP displayed on the website.",
      });
    }

    // Verify the server
    server.isVerified = true;
    await server.save();
    await ServerOTP.deleteMany({ server: server._id });

    res.status(200).json({
      message:
        "Server verified successfully! You can now close the verification window on the website.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
