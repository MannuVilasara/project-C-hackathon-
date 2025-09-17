import express from 'express';
import { signup ,login, logout, sendOtp, verifyOtp, sendMessage} from '../controller/user.controller.js';


const router=express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)
router.post('/send-message',sendMessage)

export default router