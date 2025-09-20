import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getOtp } from "../utils/nanoId.js";
import OTP from "../models/otp.model.js";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username, !email, !password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User created successfully", token, newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    res.clearCookie("token", { httpOnly: true, sameSite: "None" });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = getOtp();

    await OTP.findOneAndUpdate(
      { email },
      {
        otp,
        expire: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true, new: true }
    );

    const templatePath = path.join(
      __dirname,
      "../../../client/src/templates/otpTemplate.html"
    );
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const html = htmlTemplate.replace("{{OTP_CODE}}", otp);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: process.env.OUR_DOMAIN,
      to: email,
      replyTo: process.env.OUR_DOMAIN,
      subject: "Your OTP Verification Code",
      html: html,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const otpEntry = await OTP.findOne({ email });
    if (!otpEntry) {
      return res.status(404).json({ message: "OTP not found" });
    }
    if (otpEntry.expire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    if (otpEntry.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, subject, and message are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    if (
      !process.env.RESEND_API_KEY ||
      !process.env.OUR_DOMAIN ||
      !process.env.OUR_GMAIL
    ) {
      console.error("Missing required environment variables for email service");
      return res
        .status(500)
        .json({ message: "Email service configuration error" });
    }

    const sanitizeHtml = (str) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\n/g, "<br>");
    };

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedCompany = company ? sanitizeHtml(company) : "Not provided";
    const sanitizedSubject = sanitizeHtml(subject);
    const sanitizedMessage = sanitizeHtml(message);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: process.env.OUR_DOMAIN,
      to: process.env.OUR_GMAIL,
      replyTo: email,
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${sanitizedName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">
                <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${sanitizedEmail}</a>
              </td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Company:</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${sanitizedCompany}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Subject:</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${sanitizedSubject}</td>
            </tr>
          </table>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${sanitizedMessage}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p>This message was sent via your website contact form.</p>
            <p>Received at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    console.log("Contact form message sent successfully:", data);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending contact form message:", err);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
};

// GitHub OAuth Functions
export const githubAuth = async (req, res) => {
  try {
    const userId = req.user;

    // Generate state parameter for security (include userId)
    const state = Buffer.from(
      JSON.stringify({ userId, timestamp: Date.now() })
    ).toString("base64");

    // Simplified scope - only need basic user info
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user:email&state=${state}`;

    res.status(200).json({
      authUrl: githubAuthUrl,
      message: "Redirect to GitHub for authorization",
    });
  } catch (err) {
    console.error("Error initiating GitHub OAuth:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const githubCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res
        .status(400)
        .redirect(
          `${process.env.CLIENT_URL}/dashboard?error=github_auth_failed`
        );
    }

    // Verify state parameter
    let decodedState;
    try {
      decodedState = JSON.parse(Buffer.from(state, "base64").toString());
    } catch (err) {
      return res
        .status(400)
        .redirect(`${process.env.CLIENT_URL}/dashboard?error=invalid_state`);
    }

    const { userId } = decodedState;

    // Exchange code for access token (temporarily to get user info)
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      // Try to get user for proper redirect, fallback to user-dashboard
      let dashboardRoute = "/user-dashboard";
      try {
        const user = await User.findById(userId);
        if (user?.role === "admin") {
          dashboardRoute = "/admin-dashboard";
        } else if (user?.role === "serviceProvider") {
          dashboardRoute = "/provider-dashboard";
        }
      } catch (userError) {
        console.error("Error getting user for redirect:", userError);
      }

      return res
        .status(400)
        .redirect(
          `${process.env.CLIENT_URL}${dashboardRoute}?error=token_exchange_failed`
        );
    }

    // Get user info from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const githubUser = userResponse.data;

    // Only store GitHub username (no token storage)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        githubUser: githubUser.login,
        githubConnectedAt: new Date(),
      },
      { new: true }
    );

    // Redirect to appropriate dashboard based on user role
    let dashboardRoute = "/user-dashboard";
    if (updatedUser.role === "admin") {
      dashboardRoute = "/admin-dashboard";
    } else if (updatedUser.role === "serviceProvider") {
      dashboardRoute = "/provider-dashboard";
    }

    res.redirect(
      `${process.env.CLIENT_URL}${dashboardRoute}?github_connected=true`
    );
  } catch (err) {
    console.error("Error in GitHub callback:", err);

    // Try to get user for proper redirect, fallback to user-dashboard
    let dashboardRoute = "/user-dashboard";
    try {
      const user = await User.findById(userId);
      if (user?.role === "admin") {
        dashboardRoute = "/admin-dashboard";
      } else if (user?.role === "serviceProvider") {
        dashboardRoute = "/provider-dashboard";
      }
    } catch (userError) {
      console.error("Error getting user for redirect:", userError);
    }

    res
      .status(500)
      .redirect(
        `${process.env.CLIENT_URL}${dashboardRoute}?error=server_error`
      );
  }
};

export const getGitHubStatus = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user || !user.githubUser) {
      return res.status(400).json({
        connected: false,
        message: "GitHub not connected",
      });
    }

    // Check SecureBot installation status
    let secureBotStatus = null;
    try {
      const secureBotResponse = await axios.get(
        `${process.env.SECUREBOT_API_URL}/api/installation/status?username=${user.githubUser}`
      );
      secureBotStatus = secureBotResponse.data;
    } catch (error) {
      console.error("Error checking SecureBot status:", error);
      secureBotStatus = {
        success: false,
        installed: false,
        message: "Could not check SecureBot installation status",
      };
    }

    res.status(200).json({
      connected: true,
      githubUser: user.githubUser,
      connectedAt: user.githubConnectedAt,
      secureBot: secureBotStatus,
    });
  } catch (err) {
    console.error("Error getting GitHub status:", err);
    res.status(500).json({ message: "Failed to get GitHub status" });
  }
};

export const disconnectGithub = async (req, res) => {
  try {
    const userId = req.user;

    await User.findByIdAndUpdate(userId, {
      $unset: { githubUser: 1, githubConnectedAt: 1 },
    });

    res.status(200).json({ message: "GitHub disconnected successfully" });
  } catch (err) {
    console.error("Error disconnecting GitHub:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
