import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const VerificationPopup = ({ server, isOpen, onClose }) => {
  const [otp, setOtp] = useState("");
  const [generatingOtp, setGeneratingOtp] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

  // Debug logging
  useEffect(() => {
    console.log("VerificationPopup props:", { server, isOpen });
  }, [server, isOpen]);

  const generateOtp = useCallback(async () => {
    if (!server || !server._id) {
      console.error("Server data is missing");
      toast.error("Server data is missing. Please try again.");
      onClose();
      return;
    }

    try {
      setGeneratingOtp(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate/otp/${server._id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setOtp(response.data.otp);
        setOtpGenerated(true);
        setTimeRemaining(600); // Reset timer to 10 minutes
        toast.success("OTP generated successfully!");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to generate OTP. Please try again.");
      }
      onClose();
    } finally {
      setGeneratingOtp(false);
    }
  }, [server, onClose]);

  useEffect(() => {
    if (isOpen && !otpGenerated && server && server._id) {
      generateOtp();
    }
  }, [isOpen, otpGenerated, generateOtp, server]);

  useEffect(() => {
    let interval = null;
    if (otpGenerated && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setOtpGenerated(false);
            setOtp("");
            toast.error("OTP expired. Please close and try again.");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpGenerated, timeRemaining]);

  // Poll for verification status
  useEffect(() => {
    let pollInterval = null;
    if (otpGenerated && server) {
      pollInterval = setInterval(async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/my/servers`,
            { withCredentials: true }
          );
          const updatedServer = response.data.servers.find(
            (s) => s._id === server._id
          );
          if (updatedServer && updatedServer.isVerified) {
            toast.success("Server verified successfully!");
            onClose();
            // Trigger a refresh in the parent component
            window.location.reload();
          }
        } catch (error) {
          console.error("Error checking verification status:", error);
        }
      }, 2000); // Check every 2 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [otpGenerated, server, onClose]);

  const handleClose = () => {
    setOtp("");
    setOtpGenerated(false);
    setTimeRemaining(600);
    onClose();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!isOpen) return null;

  if (!server || !server._id) {
    console.warn("VerificationPopup: Server data is missing", {
      server,
      isOpen,
    });
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Verify Server</h3>
            <p className="text-gray-400 text-sm">
              {server?.name || "Unknown Server"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {generatingOtp ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Generating OTP...</p>
            </div>
          ) : (
            <>
              <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Step 1: Run this command on your server
                </h4>
                <div className="bg-black/60 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <code className="text-green-400">
                      bash-executor-verify{" "}
                      {import.meta.env.VITE_API_URL ||
                        "https://your-api-url.com"}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `bash-executor-verify ${
                            import.meta.env.VITE_API_URL ||
                            "https://your-api-url.com"
                          }`
                        )
                      }
                      className="text-gray-400 hover:text-white transition-colors ml-2"
                      title="Copy command"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Run this command on your server terminal. It will prompt you
                  for an OTP.
                </p>
              </div>

              {otpGenerated && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-green-400 mb-2">
                    Step 2: Enter this OTP when prompted
                  </h4>
                  <div className="bg-black/60 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-mono font-bold text-white tracking-wider">
                        {otp}
                      </div>
                      <button
                        onClick={() => copyToClipboard(otp)}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Copy OTP"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-green-400 text-sm">
                      Copy this OTP and paste it when the command prompts you.
                    </p>
                    <div className="text-green-400 text-sm font-mono">
                      Expires in: {formatTime(timeRemaining)}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">
                  Instructions
                </h4>
                <ol className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span>SSH into your server that you want to verify</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span>
                      Run the command shown above in your server terminal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span>
                      When prompted for OTP, enter the 6-digit code displayed
                      above
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">4.</span>
                    <span>
                      The verification will complete automatically if successful
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                  Important
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Keep this window open during verification</li>
                  <li>• The OTP expires in 10 minutes</li>
                  <li>
                    • Run the command from the exact server IP you registered
                  </li>
                  <li>
                    • Verification requests from other sources will be rejected
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
