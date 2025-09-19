import mongoose from "mongoose";

const serverOtpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const ServerOTP = mongoose.model("ServerOTP", serverOtpSchema);
export default ServerOTP;
