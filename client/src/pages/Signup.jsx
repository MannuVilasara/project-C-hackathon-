import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import appContext from "../context/AppContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [otp, setotp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) 
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const {user,setuser,navigate,settoken}=useContext(appContext)


  const sendOtpHandler = async (e) => {
    e.preventDefault();
    

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/send-otp`, 
        { email }, 
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
        setStep(2);
      } else {
        toast.error(res.data.message || "Error sending OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      toast.error("OTP is required");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify-otp`, 
        { email, otp }, 
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
        setStep(3);
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  
  const submithandler = async (e) => {
    e.preventDefault();
    
    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    setIsLoading(true);
    
    const userData = {
      username,
      email,
      password
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, userData, {withCredentials: true});
      
      if (res.status === 201 || res.status === 200) {
        setuser(res.data.newUser);
        settoken(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.newUser));
        localStorage.setItem("token", res.data.token);

        setusername("");
        setemail("");
        setpassword("");
        setotp("");

        navigate('/');
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Error signing up");
        console.error("Error signing up:", res.data);
      }  
    } catch (err) {
      toast.error(err.response?.data?.message || "Error signing up");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-x-hidden">
      
      <div className="absolute inset-0">
        <img 
          src="/background-auth.webp" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-6">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Secure<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Auth</span>
              </h1>
              <p className="text-xl text-gray-400 mb-6 max-w-md">
                Advanced cybersecurity platform with enterprise-grade authentication
              </p>
            

              <div className="space-y-3 text-left max-w-md">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">Multi-factor authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">Email verification system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">Enterprise security standards</span>
                </div>
              </div>
            </div>
          </div>


          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div 
                className="backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                style={{ backgroundColor: 'rgba(36, 36, 36, 0.95)' }}
              >
                <h2 className="text-2xl text-white font-bold mb-1 text-center">
                  {step === 1 && "Create Account"}
                  {step === 2 && "Verify Email"}
                  {step === 3 && "Complete Setup"}
                </h2>
                
                <p className="text-gray-400 text-sm text-center mb-8">
                  {step === 1 && "Enter your credentials to get started"}
                  {step === 2 && "Check your email for verification code"}
                  {step === 3 && "Registration almost complete"}
                </p>

                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 1 ? 'bg-white text-black' : 'bg-gray-700 text-gray-400'
                    }`}>
                      1
                    </div>
                    <div className={`h-px w-6 transition-all duration-300 ${step >= 2 ? 'bg-white' : 'bg-gray-700'}`}></div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 2 ? 'bg-white text-black' : 'bg-gray-700 text-gray-400'
                    }`}>
                      2
                    </div>
                    <div className={`h-px w-6 transition-all duration-300 ${step >= 3 ? 'bg-white' : 'bg-gray-700'}`}></div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 3 ? 'bg-white text-black' : 'bg-gray-700 text-gray-400'
                    }`}>
                      3
                    </div>
                  </div>
                </div>


                {step === 1 && (
                  <form onSubmit={sendOtpHandler} className="space-y-5">
                    <div className="space-y-4">
                      <input
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-gray-600/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                      />
                      
                      <input
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-gray-600/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                      />
                      
                      <input
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        placeholder="Password (min 6 characters)"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-gray-600/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                      />
                    </div>

                    <div className="flex items-start gap-3 mt-4">
                      <input
                        type="checkbox"
                        id="acceptTermsSignup"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-4 h-4 mt-1 rounded bg-black/40 border border-gray-600/40 text-white focus:ring-white/50"
                      />
                      <label htmlFor="acceptTermsSignup" className="text-gray-300 text-sm cursor-pointer">
                        I agree to the{" "}
                        <Link to="/terms-and-conditions"  className="text-white hover:text-gray-300 underline">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-6 py-3 cursor-pointer rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          <span>Sending OTP...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          Send Verification Code
                        </div>
                      )}
                    </button>
                  </form>
                )}


                {step === 2 && (
                  <div>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-sm">Code sent to <span className="text-white font-medium">{email}</span></p>
                    </div>
                    
                    <form onSubmit={verifyOtpHandler} className="space-y-5">
                      <input
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                        type="text"
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-4 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-gray-600/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 text-center text-xl font-mono tracking-widest"
                      />

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            <span>Verifying...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verify Code
                          </div>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full cursor-pointer py-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to edit details
                      </button>
                    </form>
                  </div>
                )}


                {step === 3 && (
                  <div>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/20 rounded-full mb-4">
                        <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">Email Verified!</h3>
                      <p className="text-gray-400 text-sm">Complete your registration to access SecureAuth</p>
                    </div>
                    
                    <form onSubmit={submithandler} className="space-y-5">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 cursor-pointer rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Complete Registration
                          </div>
                        )}
                      </button>
                    </form>
                  </div>
                )}


                <div className="text-center mt-6 pt-6 border-t border-gray-700/30">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;