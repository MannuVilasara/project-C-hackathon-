import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp:{
    type:Number,
    required:true,
  },
  expire:{
    type: Date,
    required: true,
    index: { expires: '300' }
  }
});


const OTP=mongoose.model("OTP",otpSchema)
export default OTP;
