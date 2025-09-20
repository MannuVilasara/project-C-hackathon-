import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    githubUser: {
      type: String,
      unique: true,
      sparse: true, // Allow null values to be non-unique
    },
    githubConnectedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin", "serviceProvider"],
      default: "user",
    },

    //signup metadata when user signups
    signupMeta: {
      ip: { type: String },
      location: {
        city: { type: String },
        region: { type: String },
        country: { type: String },
      },
      isp: { type: String },
      device: {
        browser: { type: String },
        version: { type: String },
        os: { type: String },
        device: { type: String },
      },
    },

    //stores user last 10 login histories
    loginHistory: [
      {
        ip: { type: String },
        location: {
          city: { type: String },
          region: { type: String },
          country: { type: String },
        },
        isp: { type: String },
        device: {
          browser: { type: String },
          version: { type: String },
          os: { type: String },
          device: { type: String },
        },
        loggedInAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
