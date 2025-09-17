import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getOtp } from "../utils/nanoId.js";
import OTP from "../models/otp.model.js";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    res.status(201).json({ message: "User created successfully", token });
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
    res.status(200).json({ message: "Login successful", token });
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


    const templatePath = path.join(__dirname, "../../../client/src/templates/otpTemplate.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");
    

    const html = htmlTemplate.replace("{{OTP_CODE}}", otp);

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await resend.emails.send({
      from: process.env.OUR_GMAIL,
      to: email,
      replyTo: process.env.OUR_GMAIL,
      subject: "Your OTP Verification Code",
      html: html, 
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp=async(req,res)=>{
  try{
    const {email,otp}=req.body;
    if(!email){
      return res.status(400).json({message:"Email is required"});
    }
    const otpEntry=await OTP.findOne({email});
    if(!otpEntry){
      return res.status(404).json({message:"OTP not found"});
    }
    if(otpEntry.expire<Date.now()){
      return res.status(400).json({message:"OTP expired"});
    }
    if(otpEntry.otp!==Number(otp)){
      return res.status(400).json({message:"Invalid OTP"});
    }
    res.status(200).json({message:"OTP verified successfully"});
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}